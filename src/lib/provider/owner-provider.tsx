'use client';

import { useParams } from 'next/navigation';
import {
  useEffect,
  useState,
  ReactNode,
  createContext,
  useContext,
} from 'react';
import { useStorage } from '../useStorage';

const OwnerContext = createContext<{ owner: boolean }>({ owner: false });

interface OwnerProviderProps {
  children: ReactNode;
}

export const OwnerProvider = ({ children }: OwnerProviderProps) => {
  const [owner, setOwner] = useState(false);
  const params = useParams<{ categoryId: string }>();
  const { userInfo } = useStorage();

  useEffect(() => {
    if (params.categoryId) {
      const isOwner = userInfo.userCategories!.some(
        (category) => category.categoryId == parseInt(params.categoryId)
      );
      setOwner(isOwner);
      console.log(isOwner);
    }
  }, [params]);

  return (
    <OwnerContext.Provider value={{ owner }}>{children}</OwnerContext.Provider>
  );
};

export const useOwner = () => useContext(OwnerContext);
