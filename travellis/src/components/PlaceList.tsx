'use client';

import { useState, useEffect } from 'react';
import { Place, searchPlaces } from '../services/api';

interface PlaceListProps {
  location: { lat: number; lng: number };
}

export const PlaceList = ({ location }: PlaceListProps) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('restaurant');
  const [query, setQuery] = useState('');

  const categories = [
    { value: 'restaurant', label: 'Restaurants' },
    { value: 'hotel', label: 'Hotels' },
    { value: 'park', label: 'Parks' },
    { value: 'museum', label: 'Museums' },
    { value: 'shopping_mall', label: 'Shopping' },
  ];

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY) {
        setError('Google Places API key is not configured');
        return;
      }

      setLoading(true);
      setError(null);
      try {
        console.log('Fetching places with location:', location);
        const results = await searchPlaces(query, location, 5000, category);
        console.log('Fetched places:', results);
        setPlaces(results);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(`Failed to fetch places: ${errorMessage}`);
        console.error('Error fetching places:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [location, category, query]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <h3 className="text-red-800 font-bold mb-2">Error</h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => setError(null)}
          className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search places..."
          className="flex-1 p-2 border rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading places...</p>
        </div>
      ) : places.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          No places found. Try adjusting your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((place) => (
            <div key={place.id} className="border rounded p-4 hover:shadow-lg transition-shadow">
              {place.photos?.[0] && (
                <img
                  src={place.photos[0]}
                  alt={place.name}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
              <h3 className="font-bold">{place.name}</h3>
              <p className="text-gray-600">{place.vicinity}</p>
              {place.rating && (
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{place.rating}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 