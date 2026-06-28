import React, { useEffect } from 'react';
// @ts-expect-error - Vite PWA virtual module
import { useRegisterSW } from 'virtual:pwa-register/react';
import { toast } from 'sonner';

export default function PWAUpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      if (r) {
        setInterval(() => {
          r.update();
        }, 60 * 60 * 1000);
      }
    },
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      toast('Update Available', {
        description: 'A new version of QuickDrop is available. Click to update.',
        duration: Infinity,
        action: {
          label: 'Update',
          onClick: () => {
            updateServiceWorker(true);
          },
        },
        onDismiss: () => setNeedRefresh(false)
      });
    }
  }, [needRefresh, setNeedRefresh, updateServiceWorker]);

  return null;
}
