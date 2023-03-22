import pb from '../(lib)/pocketbase';
import { useState } from 'react';
import useLogin from './useLogin';

export default function useRegister() {
  const [isLoading, setLoading] = useState();
  const { login } = useLogin();

  async function registerUser(data) {
    setLoading(true);
    data.emailVisibility = true;
    try {
      const response = await pb.collection('users').create(data);
      login({ email: data.email, password: data.password });
      setLoading(false);
      return false;
    } catch (e) {
      setLoading(false);
      return e.data.data;
    }
  }
  return { registerUser, isLoading };
}
