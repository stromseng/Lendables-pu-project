'use client';
import { NextUIProvider } from '@nextui-org/react';
import PageLayout from './(components)/PageLayout';
import Header from './Header';

export default function Providers({ children }) {
  return (
    <NextUIProvider disableBaseline={true}>
      <Header />
      <PageLayout>
        <main>{children}</main>
      </PageLayout>
    </NextUIProvider>
  );
}
