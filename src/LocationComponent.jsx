import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig'; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const onSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });

      addDoc(collection(db, 'konumlar'), {
        latitude,
        longitude,
        timestamp: new Date().toISOString() 
      });
    };

    const onError = (error) => {
      setError(error.message);
    };

    if (!navigator.geolocation) {
      setError('browser not found location services.');
    } else {
      const watchId = navigator.geolocation.watchPosition(onSuccess, onError);

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [db]);

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
