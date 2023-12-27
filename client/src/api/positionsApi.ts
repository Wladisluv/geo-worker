import axios from "axios";
import { IPosition } from "../interfaces/position.interface";

const BASE_URL = process.env.REACT_APP_POSITIONS_BASE_URL;

export const positionsApi = {
  getPositions: async () => {
    try {
      const response = await axios.get(BASE_URL!, {
        validateStatus: () => true,
      });
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding position:", error);
      throw error;
    }
  },

  addPosition: async (position: IPosition) => {
    try {
      const response = await axios.post(BASE_URL!, position, {
        validateStatus: () => true,
      });
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding position:", error);
      throw error;
    }
  },

  editPosition: async (id: number, updatedPosition: IPosition) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/update/${id}`,
        updatedPosition
      );
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating position:", error);
      throw error;
    }
  },

  removePosition: async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`);
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error remove position:", error);
      throw error;
    }
  },
};
