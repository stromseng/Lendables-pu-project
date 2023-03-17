import pb from 'src/app/(lib)/pocketbase.js';
import { useMutation } from 'react-query';
import { useState } from 'react';

export default function useCoords() {
  const [coordsIsLoading, setCoordsIsLoading] = useState();
  const [isError, setError] = useState();

  async function getCoords(address) {
    setCoordsIsLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const myJson = await response.json(); //extract JSON from the http response
      setError(myJson.status != 'OK');
      return myJson.results[0];
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setCoordsIsLoading(false);
  }
  return { getCoords, coordsIsLoading, isError };
}
