"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type HeroContextType = {
  visited: boolean;
  setVisited: (v: boolean) => void;
};

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export const HeroProvider = ({ children }: { children: ReactNode }) => {
  const [visited, setVisited] = useState(false);
  return (
    <HeroContext.Provider value={{ visited, setVisited }}>
      {children}
    </HeroContext.Provider>
  );
};

export const useHero = () => {
  const context = useContext(HeroContext);
  if (!context) throw new Error("useHero must be inside HeroProvider");
  return context;
};
