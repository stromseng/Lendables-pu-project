import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Loading } from '@nextui-org/react';
import useCoords from '../(hooks)/useCoords';

const Map = ({ address }) => {
  const { getCoords, coordsIsLoading } = useCoords();
  const [coords, setCoords] = useState();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    getCoords(address).then((data) => {
      setCoords(data.geometry.location);
    });
  }, []);

  return !isLoaded || !coordsIsLoading ? (
    <Loading type="points" color="success" style={{ margin: 'auto' }} />
  ) : (
    <GoogleMap zoom={12} center={coords} mapContainerClassName="mapContainer">
      <MarkerF position={coords} />
    </GoogleMap>
  );
};

export default Map;
