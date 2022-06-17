import { IAppointment } from "./appointment";
import { IDoctor } from "./doctor";
import { IPatient } from "./patient";

export type TicketStatus = 'WAITING' | 'STARTED' | 'ON_HOLD' | 'DONE'
export interface ITicket {
    id: number,
    appointment: IAppointment,
    patient: IPatient,
    status: TicketStatus
}