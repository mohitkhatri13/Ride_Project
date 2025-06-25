import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useSelector } from 'react-redux';

const LiveTracking = () => {
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);

  const {
    pickup,
    destination,
    captainCoordinates: storeCaptainCoordinates,
  } = useSelector((state) => state.location);

  // ✅ Parse localStorage values
  useEffect(() => {
    const storedPickup = localStorage.getItem("pickupCoordinates");
    const storedDestination = localStorage.getItem("destinationCoordinates");

    const parseCoords = (data, fallback, label) => {
      if (!data) {
        console.warn(`${label} missing in localStorage. Using fallback.`);
        return fallback;
      }
      try {
        const parsed = JSON.parse(data);
        const { ltd, lat, lng } = parsed;
        const finalLat = lat ?? ltd ?? fallback.lat;
        const finalLng = lng ?? fallback.lng;
        return { lat: finalLat, lng: finalLng };
      } catch (err) {
        console.error(`Failed to parse ${label}`, err);
        return fallback;
      }
    };

    setPickupCoordinates(parseCoords(storedPickup, { lat: 28.6139, lng: 77.2090 }, "Pickup"));
    setDestinationCoordinates(parseCoords(storedDestination, { lat: 28.7041, lng: 77.1025 }, "Destination"));
  }, []);

  // ✅ Normalize captainCoordinates from Redux
  const captainCoordinates = storeCaptainCoordinates
    ? {
        lat: storeCaptainCoordinates.lat ?? storeCaptainCoordinates.ltd ?? 28.5355,
        lng: storeCaptainCoordinates.lng ?? 77.3910,
      }
    : { lat: 28.5355, lng: 77.3910 };

  if (!pickupCoordinates || !destinationCoordinates) return <div>Loading map...</div>;

  // Icons 
  // const CAR_IMG = "https://www.flaticon.com/free-icon/car_89102";
  const CAR_IMG = "https://cdn-icons-png.flaticon.com/512/744/744465.png";

  const CaptainIcon = new L.Icon({
    iconUrl: CAR_IMG,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
  });

  const pickupIcon = new L.DivIcon({
    html: `<div style="width: 20px; height: 20px; background-color: black; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
      <div style="width: 5px; height: 5px; background-color: white; border-radius: 100%;"></div>
    </div>`,
    iconSize: [0, 10],
    iconAnchor: [5, 5],
  });

  const destinationIcon = new L.DivIcon({
    html: `<div style="width: 20px; height: 20px; background-color: black; display: flex; align-items: center; justify-content: center;">
      <div style="width: 5px; height: 5px; background-color: white;"></div>
    </div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  const PopupMarker = ({ position, icon, location }) => {
    const markerRef = useRef(null);

    useEffect(() => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }, [position]);

    return (
      <Marker ref={markerRef} position={position} icon={icon}>
        <Popup>{location}</Popup>
      </Marker>
    );
  };

  const ZoomToLocations = () => {
    const map = useMap();
    useEffect(() => {
      const bounds = L.latLngBounds(
        L.latLng(pickupCoordinates.lat, pickupCoordinates.lng),
        L.latLng(destinationCoordinates.lat, destinationCoordinates.lng),
        L.latLng(captainCoordinates.lat, captainCoordinates.lng)
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }, [pickupCoordinates, destinationCoordinates, captainCoordinates]);
    return null;
  };

  const RoutingMachine = () => {
    const map = useMap();
    useEffect(() => {
      const controls = [];

      const captainToPickup = L.Routing.control({
        waypoints: [
          L.latLng(pickupCoordinates.lat-0.1, pickupCoordinates.lng-0.1),
          L.latLng(pickupCoordinates.lat, pickupCoordinates.lng),
        ],
        createMarker: () => null,
        lineOptions: {
          styles: [{ color: 'black', weight: 5, dashArray: '10, 10' }],
        },
        addWaypoints: false,
        routeWhileDragging: false,
        fitSelectedRoutes: false,
        show: false,
      }).addTo(map);
      controls.push(captainToPickup);

      const pickupToDest = L.Routing.control({
        waypoints: [
          L.latLng(pickupCoordinates.lat, pickupCoordinates.lng),
          L.latLng(destinationCoordinates.lat, destinationCoordinates.lng),
        ],
        createMarker: () => null,
        lineOptions: {
          styles: [{ color: 'black', weight: 5 }],
        },
        addWaypoints: false,
        routeWhileDragging: false,
        fitSelectedRoutes: false,
        show: false,
      }).addTo(map);
      controls.push(pickupToDest);

      return () => {
        controls.forEach(ctrl => map.removeControl(ctrl));
      };
    }, [captainCoordinates, pickupCoordinates, destinationCoordinates]);

    return null;
  };


 

  return (
    <div className="h-[100%] w-[100%]">
      <MapContainer
        center={[pickupCoordinates.lat, pickupCoordinates.lng]}
        zoom={13}
        style={{ height: '50vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RoutingMachine />
        <ZoomToLocations />
        <PopupMarker
          position={[pickupCoordinates.lat, pickupCoordinates.lng]}
          // position={[27.93, 76.85]}
          icon={pickupIcon}
          location={pickup || "Pickup Location"}
        />
        <PopupMarker
          position={[destinationCoordinates.lat, destinationCoordinates.lng]}
          
          icon={destinationIcon}
          location={destination || "Destination Location"}
        />
        <PopupMarker
           position={[pickupCoordinates.lat-0.1, pickupCoordinates.lng-0.1]}
          // position={[27.95, 76.88]}
          icon={CaptainIcon}
          location="Captain"
        />
      </MapContainer>
    </div>
  );
};

export default LiveTracking;

