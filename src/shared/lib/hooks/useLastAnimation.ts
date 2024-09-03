import { useRef, useSyncExternalStore } from 'react';

type Props = {
  opt: IntersectionObserverInit;
  // classAnimation: string;
  toggledVisible: (visible: boolean) => void;
};

export const useLastAnimation = ({ opt, toggledVisible }: Props) => {
  const targetRef = useRef<HTMLImageElement>(null);

  const getSnapShot = () => {
    if (targetRef.current) {
      return targetRef.current;
    }
    return null;
  };

  const subscribe = () => {
    const observer = new IntersectionObserver(([entry]) => {
      toggledVisible(entry.isIntersecting);
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
