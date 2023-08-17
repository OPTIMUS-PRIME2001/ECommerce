'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider} from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

interface ClientOnlyProps extends ThemeProviderProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ 
  children,
  ...props
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
      setHasMounted(true);
  }, [])

  if (!hasMounted) return null;

  return (
    <ThemeProvider attribute='class' defaultTheme="system" enableSystem {...props}>
      {children}
    </ThemeProvider>
  );
};

export default ClientOnly;
