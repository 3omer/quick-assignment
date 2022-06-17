import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IAppointment } from '../models/appointment';
import { IDoctor } from '../models/doctor';
import { IPatient } from '../models/patient';
import { ITicket, TicketStatus } from '../models/ticket';

let APPOINTMENTS_COUNTER = 1
let PATIENTS_COUNTER = 1
let TICKETS_COUNTER = 1
@Injectable({
    providedIn: 'root'
})
export class DataService {

    private doctorsBs = new BehaviorSubject<IDoctor[]>(docs)
    private patientsBs = new BehaviorSubject<IPatient[]>(pats)
    private appointmentsBs = new BehaviorSubject<IAppointment[]>([])
    private ticketsBs = new BehaviorSubject<ITicket[]>([])

    doctors$: Observable<IDoctor[]>
    patients$: Observable<IPatient[]>
    appointments$: Observable<IAppointment[]>
    avaliableAppointments$: Observable<IAppointment[]>;
    tickets$: Observable<ITicket[]>
    startedTickets$: Observable<ITicket[]>
    onHoldTickets$: Observable<ITicket[]>;
    waitingTickets$: Observable<ITicket[]>;

    constructor() {
        this.appointments$ = this.appointmentsBs.asObservable()
        this.avaliableAppointments$ = this.appointments$.pipe(map(apps => apps.filter(a => !a.ticketId)))
        this.doctors$ = this.doctorsBs.asObservable()
        this.patients$ = this.patientsBs.asObservable()
        this.tickets$ = this.ticketsBs.asObservable()
        this.startedTickets$ = this.tickets$.pipe(map(t => t.filter(({ status }) => status == 'STARTED')))
        this.onHoldTickets$ = this.tickets$.pipe(map(t => t.filter(({ status }) => status == 'ON_HOLD',)), map(tickets => tickets.sort((a, b) => a.id - b.id)))
        this.waitingTickets$ = this.tickets$.pipe(map(t => t.filter(({ status }) => status == 'WAITING')))

    }

    private get doctors() {
        return this.doctorsBs.getValue()
    }
    private get appointments() {
        return this.appointmentsBs.getValue()
    }
    private get patients() {
        return this.patientsBs.getValue()
    }
    private get tickets() {
        return this.ticketsBs.getValue()
    }

    private updatedAppointment(appointment: IAppointment) {
        const updatedList = this.appointments.map(app => app.id == appointment.id ? appointment : app)
        this.appointmentsBs.next(updatedList)
    }


    addDoctor(data: IDoctor) {
        this.doctorsBs.next([...this.doctors, data])
    }

    addPatient(data: IPatient) {
        this.patientsBs.next([...this.patients, data])
    }

    addAppointments(data: { id: number, doctorId: number, duration: number }[]) {
        const apps = data.map(payload => {
            let doc = this.doctors.find((d) => d.id == payload.doctorId)
            let app: IAppointment = { id: ++APPOINTMENTS_COUNTER, doctor: doc!, duration: payload.duration }
            return app
        })
        this.appointmentsBs.next([...this.appointments, ...apps])
        console.log('appointments saved ', [this.appointmentsBs.getValue()]);

    }

    addTicket(data: { appointmentId: number, patientId: number }) {
        const appointment = this.appointments.find((app) => app.id == data.appointmentId)
        if (!appointment) {
            console.warn('appointment not found');
            return
        }
        const id = ++TICKETS_COUNTER
        appointment.ticketId = id
        const patient = this.patients.find((pat) => pat.id == data.patientId)

        const t = { id, appointment, patient, status: 'WAITING' } as ITicket
        this.updatedAppointment(appointment)
        this.ticketsBs.next([...this.tickets, t])
        console.log('ticket saved ', [this.tickets]);

    }

    changeTicketStatus(ticketId: number, status: TicketStatus) {
        const updatedList = this.tickets.map(t => {
            if (t.id == ticketId) {
                t.status = status
            }
            return t
        })

        this.ticketsBs.next(updatedList)
    }

}

const docs: IDoctor[] = [{ id: 1, name: 'Mohammed Kamal' }, { id: 2, name: 'Nazzar Hassan' }, { id: 3, name: 'Esraa Ahmed' }, { id: 4, name: 'Afraa Mohammed' }]

const pats: IPatient[] = [
    {
        id: 1,
        username: 'montee',
        fullName: 'Mohammed Usif',
        gender: 'M',
    },
    {
        id: 2,
        username: 'botto',
        fullName: 'Fakhr Aldain Satti',
        gender: 'M',
    },

    {
        id: 3,
        username: 'sara',
        fullName: 'Sarra Hassan',
        gender: 'F',
    },
    {
        id: 4,
        username: 'neena',
        fullName: 'Neimat Abdalgabar',
        gender: 'F',
    },
    {
        id: 5,
        username: 'noor',
        fullName: 'Mohammed Noor',
        gender: 'M',
    },
];

const apps: IAppointment[] = [
    { id: 1, doctor: docs[0], duration: 45 },
    { id: 3, doctor: docs[1], duration: 30 },
    { id: 2, doctor: docs[0], duration: 20 },
];

