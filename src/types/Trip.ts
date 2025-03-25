import { Car } from "./Car";
import { Hotel } from "./Hotel";
import { User } from "./user";

export interface Trip {
  type: string;
  planner: User;
  members: User[];
  destination: Location;
  hotel: Hotel;
  carService: Car;
}
