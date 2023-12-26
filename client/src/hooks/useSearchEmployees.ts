import { useMemo } from "react";
import employeesStore from "../stores/employees-store";

export const useSearchEmployees = (query: string) => {
  const searchedEmployees = useMemo(() => {
    return employeesStore.employees.filter(
      (employee: { firstName: string; lastName: string }) =>
        employee.firstName?.toLowerCase().includes(query.toLowerCase()) ||
        employee.lastName?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, employeesStore.employees]);

  return searchedEmployees;
};
