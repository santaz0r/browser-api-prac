import { useRef, useState, useSyncExternalStore } from 'react';

type Props = {
  opt: IntersectionObserverInit;
};

type CB = () => void;

export const useCountBlocks = ({ opt }: Props) => {
  const [passedOut, setPassedOut] = useState(0);
  const targetRefs = useRef<HTMLDivElement[]>([]);
  const observedBlocks = useRef<Set<HTMLDivElement>>(new Set());

  const getSnapShot = () => passedOut;

  const subscribe = (cb: CB) => {
    const observer = new IntersectionObserver((entries) => {
      entries.filter((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLDivElement;
          if (!observedBlocks.current.has(element)) {
            observedBlocks.current.add(element);
            setPassedOut((prev) => prev + 1);
          }
        }
      });

      cb();
    }, opt);

    targetRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      targetRefs.current.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
      observer.disconnect();
    };
  };

  const count = useSyncExternalStore(subscribe, getSnapShot);

  const addRef = (element: HTMLDivElement | null) => {
    if (element && !targetRefs.current.includes(element)) {
      targetRefs.current.push(element);
    }
  };

  return { visibleCount: count, addRef };
};
