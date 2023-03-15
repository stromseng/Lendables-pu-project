'use client';
import { NextUIProvider } from '@nextui-org/react';
import PageLayout from './(components)/PageLayout';
import Header from './Header';
import { SSRProvider } from '@react-aria/ssr';

export default function Providers({ children }) {
  return (
    <SSRProvider>
      <NextUIProvider disableBaseline={true}>
        <Header />
        <PageLayout>
          <main>{children}</main>
        </PageLayout>
      </NextUIProvider>
    </SSRProvider>
  );
}
