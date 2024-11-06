import '@/assets/styles/globals.css';
import AuthProvider from '@/components/auth-provider';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { GlobalProvider } from '@/context/global-context';

interface MainLayoutProps {
  children: React.ReactNode;
};

export const metadata = {
  title: 'Property pulse',
  keywords: 'rental, property, real estate',
  description: 'Find the perfect rental property',
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html>
          <body>
            <main>
              <Navbar />
              {children}
              <Footer />
            </main>
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
