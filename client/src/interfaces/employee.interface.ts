export interface IEmployee {
  id?: number;
  firstName: string;
  lastName: string;
  hireDate: string;
  positionId?: number;
  location?: {
    lat: number;
    lng: number;
  };
  position?: {
    id: number;
    title: string;
  };
}
