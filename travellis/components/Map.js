import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { fetchNearbyPlaces } from "../utils/fetchPlaces";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: -1.9501, lng: 30.0589 };

const categories = ["restaurant", "lodging", "tourist_attraction"];

{categories.map((type) => (
  <button onClick={() => fetchPlacesByType(type)}>{type}</button>
))}

const fetchPlacesByType = async (type) => {
  const results = await fetchNearbyPlaces({ lat: mapCenter.lat, lng: mapCenter.lng, type });
  setPlaces(results);
};

export default function Map() {
  const [mapCenter, setMapCenter] = useState(center);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
      const results = await fetchNearbyPlaces({ lat: mapCenter.lat, lng: mapCenter.lng, type: "restaurant" }); // change to "lodging" or "tourist_attraction"
      setPlaces(results);
    };
    loadPlaces();
  }, [mapCenter]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={14}>
        {places.map((place) => (
          <Marker
            key={place.place_id}
            position={place.geometry.location}
            title={place.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
