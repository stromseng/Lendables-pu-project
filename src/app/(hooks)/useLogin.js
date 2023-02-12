import pb from 'src/app/(lib)/pocketbase.js';
import { useMutation } from 'react-query';
import { useState } from 'react';

export default function useLogin() {
  const [isLoading, setLoading] = useState();
  const [isError, setError] = useState();

  async function login({ email, password }) {
    setLoading(true);
    try {
      const authData = await pb
        .collection('users')
        .authWithPassword(email, password);
      console.log(authData);
      setError(false);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  }

  return { login, isLoading, isError };
}
