export interface Coords {
  lat: number;
  lng: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: Role[];
  location?: Coords;
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  ROOT = 'root',
}
