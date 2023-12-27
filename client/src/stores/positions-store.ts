import { makeAutoObservable, runInAction } from "mobx";
import { IPosition } from "../interfaces/position.interface";
import { positionsApi } from "../api/positionsApi";

class PositionsStore {
  positions: IPosition[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadPositions() {
    try {
      const data = await positionsApi.getPositions();
      runInAction(() => {
        this.positions = data;
      });
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  }

  async addPosition(position: IPosition) {
    try {
      const addedPosition = await positionsApi.addPosition(position);
      this.positions = [...this.positions, addedPosition];
    } catch (error) {
      console.error("Error adding employee to the store:", error);
    }
  }

  async updatePosition(id: number, updatedPosition: IPosition) {
    try {
      await positionsApi.editPosition(id, updatedPosition);
      const index: number = this.positions.findIndex(
        (e) => e.id === updatedPosition.id
      );
      if (index !== -1) {
        this.positions[index] = updatedPosition;
      }
      await this.loadPositions();
    } catch (error) {
      console.log("Error updating employee from store", error);
    }
  }

  async deletePosition(id: number, positionId?: number) {
    try {
      await positionsApi.removePosition(id);
      this.positions = this.positions.filter((e) => e.id !== positionId);
      await this.loadPositions();
    } catch (error) {
      console.log("Error remove employee from store", error);
      throw error;
    }
  }
}

export default new PositionsStore();
