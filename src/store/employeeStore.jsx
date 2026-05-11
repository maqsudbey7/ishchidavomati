import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  employees as fakeEmployees,
} from "../data/fakeData";

const EmployeeContext =
  createContext();

export function EmployeeProvider({
  children,
}) {
  const [employees, setEmployees] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "employees"
        );

      return saved
        ? JSON.parse(saved)
        : fakeEmployees;
    });

  useEffect(() => {
    localStorage.setItem(
      "employees",
      JSON.stringify(employees)
    );
  }, [employees]);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        setEmployees,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  return useContext(
    EmployeeContext
  );
}