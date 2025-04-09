import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/place';

export interface Place {
  id: string;
  name: string;
  rating?: number;
  types: string[];
  vicinity: string;
  photos?: string[];
  price_level?: number;
}

type SearchPlacesFunction = (
  query: string,
  location: { lat: number; lng: number },
  radius?: number,
  type?: string
) => Promise<Place[]>;

export const searchPlaces: SearchPlacesFunction = async (
  query,
  location,
  radius = 5000,
  type
) => {
  try {
    console.log('Searching places with params:', {
      query,
      location,
      radius,
      type,
      hasApiKey: !!API_KEY
    });

    const response = await axios.get(`${BASE_URL}/textsearch/json`, {
      params: {
        query: `${query} ${type || ''}`,
        location: `${location.lat},${location.lng}`,
        radius,
        key: API_KEY,
      },
    });

    if (response.data.status !== 'OK') {
      throw new Error(`Google Places API error: ${response.data.status}`);
    }

    return response.data.results.map((place: any) => ({
      id: place.place_id,
      name: place.name,
      rating: place.rating,
      types: place.types,
      vicinity: place.vicinity,
      photos: place.photos?.map((photo: any) => 
        `${BASE_URL}/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=${API_KEY}`
      ),
      price_level: place.price_level,
    }));
  } catch (error) {
    console.error('Error in searchPlaces:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(`API request failed: ${error.message}`);
    }
    throw error;
  }
};

export const getPlaceDetails = async (placeId: string): Promise<Place | null> => {
  try {
    console.log('Getting place details for:', placeId);
    
    const response = await axios.get(`${BASE_URL}/details/json`, {
      params: {
        place_id: placeId,
        fields: 'name,rating,types,vicinity,photos,price_level',
        key: API_KEY,
      },
    });

    if (response.data.status !== 'OK') {
      throw new Error(`Google Places API error: ${response.data.status}`);
    }

    const place = response.data.result;
    return {
      id: place.place_id,
      name: place.name,
      rating: place.rating,
      types: place.types,
      vicinity: place.vicinity,
      photos: place.photos?.map((photo: any) => 
        `${BASE_URL}/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=${API_KEY}`
      ),
      price_level: place.price_level,
    };
  } catch (error) {
    console.error('Error in getPlaceDetails:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(`API request failed: ${error.message}`);
    }
    throw error;
  }
}; 