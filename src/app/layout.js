import './globals.css';
import Header from './Header';
import PageLayout from './(components)/PageLayout';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <PageLayout>
          <main>{children}</main>
        </PageLayout>
      </body>
    </html>
  );
}
