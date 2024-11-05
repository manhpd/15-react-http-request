import { useRef, useState, useCallback } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { updateUserPlaces } from './http.js';
import ErrorPage from './components/ErrorPage.js';

function App() {
  const selectedPlace = useRef<any>();

  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [ errorUpdateUserPlaces, setErrorUpdateUserPlaces ] = useState<any>();

  function handleStartRemovePlace(place: any) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace: any) {
    setUserPlaces((prevPickedPlaces: any) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place: any) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([...userPlaces, selectedPlace]);
    } catch (error: any) {
      setUserPlaces(userPlaces);
      setErrorUpdateUserPlaces({message: error.message || 'An error occurred while updating the user places.'} as any);
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces: any) =>
      prevPickedPlaces.filter((place: any) => place.id !== selectedPlace?.current?.id || '')
    );

    setModalIsOpen(false);
  }, []);

  const handleError = () => {
    setErrorUpdateUserPlaces(null);
  }

  return (
    <>
    <Modal open={!!errorUpdateUserPlaces} onClose={handleError}>
      { errorUpdateUserPlaces && <ErrorPage message={errorUpdateUserPlaces?.message} title="HTTP error" /> }
        
    </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          isLoading={false}
          loadingText="Loading places..."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
