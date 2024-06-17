import React, { useState, useEffect } from 'react';

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const onSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const onError = (error) => {
      if (error.code === 1) {
        setError('Konum hizmetleri kapalı. Lütfen tarayıcı ayarlarından konumu etkinleştirin.');
      } else {
        setError(error.message);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(onSuccess, onError);
    } else {
      setError('Tarayıcı konum hizmetlerini desteklemiyor.');
    }

    // Bileşen kullanımdan çıktığında konum izlemesini durdurmak için temizleme işlevi
    return () => navigator.geolocation && navigator.geolocation.clearWatch();
  }, []);

  return (
    <div>
      {error && <p>Hata: {error}</p>}
      {location && (
        <p>
          Konum: Enlem: {location.latitude}, Boylam: {location.longitude}
        </p>
      )}
    </div>
  );
};

export default LocationComponent;
