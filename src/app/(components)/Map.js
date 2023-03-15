import { useMemo, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Loading } from '@nextui-org/react';
import useCoords from '../(hooks)/useCoords';

const Map = ({ address }) => {
  const { getCoords, coordsIsLoading, isError } = useCoords();
  const [coords, setCoords] = useState();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // getCoords().then((data) => setCoords(data.results.geometry.location));

  useEffect(() => {
    getCoords(address).then((data) => {
      console.log(data);
      setCoords(data);
    });
  }, []);

  if (!isLoaded || !coordsIsLoading)
    return <Loading type="points" color="success" style={{ margin: 'auto' }} />;

  return (
    <GoogleMap zoom={12} center={coords} mapContainerClassName="mapContainer">
      <MarkerF position={coords} />
    </GoogleMap>
  );
};

export default Map;
