import { useRef, useState, useSyncExternalStore } from 'react';

type Props = {
  opt: IntersectionObserverInit;
  // fetch: () => Promise<void>;
  cb: () => void;
};

export const useInfiniteScroll = ({ opt, cb }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  const getSnapShot = () => {};

  const subscribe = () => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // setIsLoading(true);
        // fetch().finally(() => setIsLoading(false));
        observer.unobserve(entry.target);
        cb();
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

  return { targetRef, isLoading };
};
