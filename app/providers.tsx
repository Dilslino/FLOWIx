'use client';

import { useEffect } from 'react';
import i18n from './i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    i18n.init();
  }, []);

  return <>{children}</>;
}
