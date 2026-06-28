import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import ToastProvider from './components/ToastProvider';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { HelmetProvider } from 'react-helmet-async';
import { NotificationProvider } from './context/NotificationContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <NotificationProvider>
            <CartProvider>
              <App />
              <ToastProvider />
            </CartProvider>
          </NotificationProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);
