import React, { createContext, useContext, useState } from "react";

export interface IFERoleProvider {
  children: any;
}

export type possibleRole =
  | "student"
  | "study-program-admin"
  | "first-vice-dean" 
  | "subsection-chairman"
  | "head-administrator"
  | "dean"
  | "faculty-admin"
  | "lecturer"
  | "lab-head"
  | "seminar-coordinator"
  
export const UserRoleContext = createContext<possibleRole>("student");
export const UserRoleChangeContext = createContext((e: possibleRole) => {});

const FERoleProvider: React.FC<IFERoleProvider> = ({ children }) => {
  const [role, setRole] = useState<possibleRole>("student");

  function resetRole(newRole: possibleRole) {
    setRole(newRole);
  }

  return (
    <UserRoleContext.Provider value={role}>
      <UserRoleChangeContext.Provider value={resetRole}>
        {children}
      </UserRoleChangeContext.Provider>
    </UserRoleContext.Provider>
  );
};
export default FERoleProvider;
