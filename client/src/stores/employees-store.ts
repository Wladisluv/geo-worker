import { makeAutoObservable, runInAction } from "mobx";
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
      runInAction(() => {
        this.employees = data;
      });
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  }

  async addEmployee(employee: IEmployee) {
    try {
      const addedEmployee = await employeesApi.addEmployee(employee);
      this.employees = [...this.employees, addedEmployee];
    } catch (error) {
      console.error("Error adding employee to the store:", error);
    }
  }

  async updateEmployee(id: number, updatedEmployee: IEmployee) {
    try {
      await employeesApi.editEmployee(id, updatedEmployee);
      const index: number = this.employees.findIndex(
        (e) => e.id === updatedEmployee.id
      );
      if (index !== -1) {
        this.employees[index] = updatedEmployee;
      }
      await this.loadEmployees(); // Редактируем и обновляем
    } catch (error) {
      console.log("Error updating employee from store", error);
    }
  }

  async deleteEmployee(id: number, employeeId?: number) {
    try {
      await employeesApi.removeEmployee(id);
      this.employees = this.employees.filter((e) => e.id !== employeeId);
      await this.loadEmployees(); // Удаляем и обновляем
    } catch (error) {
      console.log("Error remove employee from store", error);
    }
  }
}

export default new EmployeesStore();
