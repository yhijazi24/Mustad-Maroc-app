
import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import "./css/maps.css";

const Maps = () => {
  const containerStyle = {
    width: '100%',
    height: '385px',
    position: 'relative',
  };

  const defaultCenter = {
    lat: 32.98018,
    lng: -7.61182,
  };
  const [center, setCenter] = useState(defaultCenter);
  useEffect(() => {
    const updateCenter = () => {
      if (window.innerWidth <= 460) {
        setCenter(defaultCenter)
      } else if (window.innerWidth <= 650) {
        setCenter({ lat: 32.98018, lng: -7.613 });
      } else if (window.innerWidth <= 900) {
        setCenter({ lat: 32.98018, lng: -7.614 });
      } else {
        setCenter(defaultCenter);
      }
    };

    window.addEventListener('resize', updateCenter);

    updateCenter();

    return () => window.removeEventListener('resize', updateCenter);
  }, []);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey:'' ,//'AIzaSyAFOVo15-LD4_M9gERnCqTNZI_JAcmwV1c', // Ensure this is a valid API key
  });

  if (!isLoaded) {
    console.log('Google Maps API failed to load');
    return <div>Loading...</div>;
  }

  const customMarkerIcon = {
    url: 'https://i.postimg.cc/xTgR35cx/Design-sans-titre-3-fotor-bg-remover-2024082517625.png',
    scaledSize: new window.google.maps.Size(50, 50),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(25, 50),
  };

  return (
    <div className='maps-container' id='Maps'>
      <GoogleMap
        className="google-maps"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
      >
        <Marker position={defaultCenter} icon={customMarkerIcon} />
      </GoogleMap>

      <div className='maps-info'>
        <h3 className='maps-title'>MUSTAD MAROC</h3>
        <div className='maps-line'></div>
        <address className='maps-address'>21 zone industrielle<br />26000 Settat</address>
        <p className='maps-phone'>TEL +212 52 37 29 900</p>
      </div>
    </div>
  );
};

export default Maps;
