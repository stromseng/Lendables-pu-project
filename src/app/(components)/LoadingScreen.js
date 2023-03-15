'use client';

import { Loading } from '@nextui-org/react';

export default function LoadingScreen() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <Loading type="points" color="success" size="xl" />
    </div>
  );
}
