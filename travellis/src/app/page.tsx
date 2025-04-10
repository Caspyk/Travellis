'use client';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { PlaceList } from '../components/PlaceList';

export default function Home() {
  const defaultLocation = { lat: 37.7749, lng: -122.4194 }; // Example: San Francisco

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Discover Places</h1>
        <ErrorBoundary>
          <PlaceList location={defaultLocation} />
        </ErrorBoundary>
      </div>
    </main>
  );
}
