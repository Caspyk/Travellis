export async function fetchNearbyPlaces({ lat, lng, type }) {
    const radius = 2000; // in meters
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
    const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=LAT,LNG&radius=1500&type=restaurant&key=AIzaSyD-RtFy9YeersmUp7WVcKagiXQxQimWtOI`;
  
    const res = await fetch(`/api/placesProxy?url=${encodeURIComponent(endpoint)}`);
    const data = await res.json();
    return data.results;
  }
  