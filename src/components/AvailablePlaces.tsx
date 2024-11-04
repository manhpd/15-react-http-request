import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace } : { onSelectPlace: (place: any) => void }) {
  return (
    <Places
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
