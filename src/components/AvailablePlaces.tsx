import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import ErrorPage from './ErrorPage.js';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace } : { onSelectPlace: (place: any) => void }) {
  const [ availablePlaces, setAvailablePlaces ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState<any>(null);

  useEffect(() => {
      setIsLoading(true);

      try {
        const places = fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const sortedPlaces = sortPlacesByDistance(places, latitude, longitude) || [];
          setAvailablePlaces(sortedPlaces as []);
        });
      }
      catch (error) {
        setError(error);
        setIsLoading(false);
      }

  }, []);

  if (error) {
    return <ErrorPage message={error.message} title="HTTP error" />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
