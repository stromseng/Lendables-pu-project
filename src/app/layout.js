import './globals.css';
import Providers from './Providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <Providers>{children}</Providers>
    </html>
  );
}
