import pb from 'src/app/(lib)/pocketbase.js';
import { useState } from 'react';

export default function useLogout() {
  const [dummy, setDummy] = useState(0);
  function logout() {
    pb.authStore.clear();
    setDummy(Math.random);
  }

  return logout;
}
