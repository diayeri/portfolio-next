"use client";

import { createContext, useContext } from "react";
import { roleMap, RoleType } from "@/data/roleMap";

type RoleContextType = {
  roleKey: RoleType;
  roleData: (typeof roleMap)[RoleType];
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({
  children,
  roleKey,
}: {
  children: React.ReactNode;
  roleKey: RoleType;
}) {
  const roleData = roleMap[roleKey];

  return (
    <RoleContext.Provider value={{ roleKey, roleData }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within RoleProvider");
  return context;
};
