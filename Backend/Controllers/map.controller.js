const mapService = require('../services/maps.services');
const { validationResult } = require('express-validator');
const axios = require("axios"); // Fix import issue

module.exports.getCoordinates = async (req, res , next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;
    console.log(address);

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
        console.log(coordinates)
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
};

module.exports.getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    try {
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.getAutoCompleteSuggestions = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const  address  = req.query;
        console.log(address);
    try {
        const suggestions = await mapService.getAutoCompleteSuggestions(address);
        console.log("suggesstion" ,suggestions);
        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

