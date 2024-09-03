import { useCallback, useEffect, useState } from 'react';

type CartItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  count?: number;
};

export const useSyncLocalStore = (key: string) => {
  const getStoredItems = (): CartItem[] => {
    const storedItems = localStorage.getItem(key);
    return storedItems ? JSON.parse(storedItems) : [];
  };
  const [items, setItems] = useState(getStoredItems);

  const addItem = useCallback(
    (item: CartItem) => {
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        const itemIndex = updatedItems.findIndex((i) => i.id === item.id);

        if (itemIndex > -1) {
          updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            count: (updatedItems[itemIndex].count || 1) + 1,
          };
        } else {
          updatedItems.push({ ...item, count: 1 });
        }

        localStorage.setItem(key, JSON.stringify(updatedItems));

        return updatedItems;
      });
    },
    [key]
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === key) {
        const updatedItems = event.newValue ? JSON.parse(event.newValue) : [];
        setItems(updatedItems);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return { items, addItem };
};
