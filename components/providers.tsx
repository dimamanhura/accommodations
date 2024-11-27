'use client';

import { GlobalProvider } from '@/context/global-context';
import { NextUIProvider } from "@nextui-org/react";
import AuthProvider from '@/components/auth-provider';

interface ProvidersProps {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <NextUIProvider>
      <AuthProvider>
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </AuthProvider>
    </NextUIProvider>
  );
};

export default Providers;
