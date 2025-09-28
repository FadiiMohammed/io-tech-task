'use client';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import PageLoader from '../components/PageLoader';

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Provider store={store}>
      {children}
      <PageLoader />
    </Provider>
  );
}
