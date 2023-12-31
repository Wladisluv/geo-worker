import axios from "axios";
import { IEmployee } from "../interfaces/employee.interface";

const BASE_URL = process.env.REACT_APP_EMPLOYEES_BASE_URL;

export const employeesApi = {
  getEmployees: async () => {
    const response = await axios.get(BASE_URL!, {
      validateStatus: () => {
        return true;
      },
    });

    if (response.status === 302) {
      return response.data;
    } else {
      throw new Error(`Error fetching employees. Status: ${response.status}`);
    }
  },

  addEmployee: async (employee: IEmployee) => {
    try {
      const response = await axios.post(BASE_URL!, employee, {
        validateStatus: () => true,
      });
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding employee:", error);
      throw error;
    }
  },

  editEmployee: async (id: number, updatedEmployee: IEmployee) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/update/${id}`,
        updatedEmployee
      );
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  },

  removeEmployee: async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`);
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding employee:", error);
      throw error;
    }
  },
};
