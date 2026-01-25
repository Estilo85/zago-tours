import { useState, useEffect } from 'react';

export function useMountedStore<T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) {
  const result = store(callback) as F;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? result : undefined;
}

// Safe from hydration errors!
//   const isOpen = useMountedStore(useUIStore, (s) => s.isSidebarOpen);

//   if (isOpen === undefined) return null;
