'use client';
import { NextUIProvider } from '@nextui-org/react';
import PageLayout from './(components)/PageLayout';
import Header from './Header';
import { SSRProvider } from '@react-aria/ssr';
import { createTheme } from '@nextui-org/react';
import { createContext, useState } from 'react';

export const ThemeContext = createContext(null);

export default function Providers({ children }) {
  const darkTheme = createTheme({
    type: 'dark',
    theme: {
      colors: {
        primary: '$green600',
        customBackground: '#222527',
      },
    },
  });
  const lightTheme = createTheme({
    type: 'light',
    theme: {
      colors: {
        primary: '$green600',
        customBackground: '#ECECEC',
      },
    },
  });

  const [theme, setTheme] = useState({ type: 'light', theme: lightTheme });

  const toggleTheme = () => {
    setTheme((curr) =>
      curr.type === 'light'
        ? { type: 'dark', theme: darkTheme }
        : { type: 'light', theme: lightTheme }
    );
  };

  return (
    <body
      style={{
        backgroundColor: theme.theme.colors.customBackground.value,
      }}
    >
      <SSRProvider>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <NextUIProvider disableBaseline={true} theme={theme.theme}>
            <Header />
            <PageLayout>
              <main>{children}</main>
            </PageLayout>
          </NextUIProvider>
        </ThemeContext.Provider>
      </SSRProvider>
    </body>
  );
}
