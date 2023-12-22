import axios from "axios";

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

  addEmployee: async () => {},
};
