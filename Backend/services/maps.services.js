// const axios = require('axios');
module.exports.getAddressCoordinate = async (address) => {

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${address}&language=en&region=en&key=${apiKey}`

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const pickupCoordinates = await this.getAddressCoordinate(origin);
    const destinationCoordinates = await this.getAddressCoordinate(destination);

    const apiKey = process.env.HERE_MAP_API;
    const url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${pickupCoordinates.ltd},${pickupCoordinates.lng}&destination=${destinationCoordinates.ltd},${destinationCoordinates.lng}&return=summary&apiKey=${apiKey}`;
    try {
        const response = await axios.get(url);
        const data = response?.data.routes[0].sections[0].summary;
        if (!data) return null;
        return data.length;

    } catch (error) {
        console.log("Unable to fetch distance and time", error);
    }
}

const axios = require('axios');

module.exports.getAutoCompleteSuggestions = async (req, res) => {
    try {
        const address = req.query.query;
        console.log(address);
        if (!address) {
            return res.status(400).json({ message: 'Address query is required' });
        }

        const apiKey = process.env.GOOGLE_MAPS_API;
        const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${address}&key=${apiKey}`;
        const response = await axios.get(url);

        if (response.data.status !== 'OK') {
            return res.status(400).json({ message: response.data.error_message || 'Failed to fetch suggestions' });
        }

        const suggestions = response.data.predictions.map(prediction => ({
            place_id: prediction.place_id,
            description: prediction.description
        }));

        return res.status(200).json(suggestions);

    } catch (error) {
        console.error("Unable to fetch autocomplete suggestions:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        }
    });

    return captains;


}


