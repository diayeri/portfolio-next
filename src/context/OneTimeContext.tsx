import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

type OneTimeFlags = {
  [key: string]: boolean;
};

type OneTimeContextType = {
  flags: OneTimeFlags;
  setFlag: (key: string, value: boolean) => void;
};

const OneTimeContext = createContext<OneTimeContextType | undefined>(undefined);

export function OneTimeProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<OneTimeFlags>({});

  const setFlag = (key: string, value: boolean) => {
    setFlags((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <OneTimeContext.Provider value={{ flags, setFlag }}>
      {children}
    </OneTimeContext.Provider>
  );
}

export const useOneTime = () => {
  const context = useContext(OneTimeContext);
  if (!context) throw new Error('useOneTime must be inside OneTimeProvider');
  return context;
};
