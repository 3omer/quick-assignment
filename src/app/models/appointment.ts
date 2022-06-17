import { IDoctor } from "./doctor";

export interface IAppointment {
  id: number;
  ticketId?: number;
  doctor: IDoctor;
  duration: number;
}
