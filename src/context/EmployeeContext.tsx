import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import {
  initialEmployees,
  type Employee,
} from "../components/employees/employeeData";

interface EmployeeContextType {
  employees: Employee[];

  addEmployee: (employee: Omit<Employee, "id">) => void;

  updateEmployee: (
    id: number,
    employee: Omit<Employee, "id">
  ) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

interface EmployeeProviderProps {
  children: ReactNode;
}

export function EmployeeProvider({ children }: EmployeeProviderProps) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const addEmployee = (employee: Omit<Employee, "id">) => {
    setEmployees((previousEmployees) => {
      const newId =
        previousEmployees.length > 0
          ? Math.max(...previousEmployees.map((item) => item.id)) + 1
          : 1;

      return [
        ...previousEmployees,
        {
          ...employee,
          id: newId,
        },
      ];
    });
  };

  // Update existing employee
  const updateEmployee = (
    id: number,
    updatedEmployee: Omit<Employee, "id">
  ) => {
    setEmployees((previousEmployees) =>
      previousEmployees.map((employee) =>
        employee.id === id
          ? { ...updatedEmployee, id }
          : employee
      )
    );
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error(
      "useEmployees must be used inside EmployeeProvider"
    );
  }

  return context;
}