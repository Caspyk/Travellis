import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -1.9501, // Example: Kigali, Rwanda
  lng: 30.0589,
};

export default function Map() {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {/* Example marker */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
