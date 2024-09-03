import { useRef, useSyncExternalStore } from 'react';

export const useLazyImageObserver = (opt: IntersectionObserverInit) => {
  const targetRef = useRef<HTMLImageElement>(null);

  const getSnapShot = () => {
    if (targetRef.current) {
      return targetRef.current;
    }
    return null;
  };

  const subscribe = () => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
      }
    }, opt);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
      observer.disconnect();
    };
  };

  useSyncExternalStore(subscribe, getSnapShot);

  return targetRef;
};
