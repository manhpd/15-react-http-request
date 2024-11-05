export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    if (!response.ok) {
      throw new Error('An error occurred while fetching the available places.');
    }
    const { places } = await response.json();

    return places;
}

export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/places', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ places }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('An error occurred while updating the user places.');
    }
}