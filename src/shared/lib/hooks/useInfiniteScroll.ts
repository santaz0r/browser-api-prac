import { useRef, useSyncExternalStore } from 'react';

type Props = {
  opt: IntersectionObserverInit;
  cb: () => void;
};

export const useInfiniteScroll = ({ opt, cb }: Props) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const getSnapShot = () => {};

  const subscribe = () => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
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

  return { targetRef };
};
