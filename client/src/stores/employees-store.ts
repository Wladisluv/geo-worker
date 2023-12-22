import { makeAutoObservable } from "mobx";
import { IEmployee } from "../interfaces/employee.interface";
import { employeesApi } from "../api/employeesApi";

class EmployeesStore {
  employees: IEmployee[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadEmployees() {
    try {
      const data = await employeesApi.getEmployees();
      this.employees = data;
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  }

  getEmployees() {
    this.employees = [...this.employees];
  }

  addEmployee(employee: IEmployee) {
    this.employees = [...this.employees, employee];
  }

  updateEmployee(updatedEmployee: IEmployee) {
    const index = this.employees.findIndex((e) => e.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }

  deleteEmployee(employeeId: number) {
    this.employees = this.employees.filter((e) => e.id !== employeeId);
  }
}

export default new EmployeesStore();
