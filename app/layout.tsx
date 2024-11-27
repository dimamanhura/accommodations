import '@/assets/styles/globals.css';

import Providers from '@/components/providers';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

interface MainLayoutProps {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <html>
      <body>
        <Providers>
          <main>
            <Navbar />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default MainLayout;
