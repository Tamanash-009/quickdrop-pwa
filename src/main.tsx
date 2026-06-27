import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import ToastProvider from './components/ToastProvider';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
        <ToastProvider />
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);
