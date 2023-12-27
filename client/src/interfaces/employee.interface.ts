export interface IEmployee {
  id?: number;
  firstName: string;
  lastName: string;
  hireDate: string | null;
  positionId?: number | null;
  location?: {
    title?: string;
    lng?: number;
    lat?: number;
  };
  position?: {
    id?: number;
    title: string;
  };
}
