export interface IEmployee {
  id?: number;
  firstName: string;
  lastName: string;
  hireDate: string | null;
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
