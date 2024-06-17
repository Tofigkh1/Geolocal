import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig'; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const onSuccess = async (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });

      try {
        await addDoc(collection(db, 'konumlar'), {
          latitude,
          longitude,
          timestamp: new Date().toISOString() 
        });
      } catch (err) {
        setError(err.message);
      }
    };

    const onError = (error) => {
      setError(error.message);
    };

    if (!navigator.geolocation) {
      setError('Browser does not support location services.');
    } else {
      const watchId = navigator.geolocation.watchPosition(onSuccess, onError);

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, []);
// local
  return (
    <div>
      {error && <p>Hata: {error}</p>}
      {location && (
        <p>
          Location: latitude: {location.latitude}, longitude: {location.longitude}
        </p>
      )}
    </div>
  );
};

export default LocationComponent;
