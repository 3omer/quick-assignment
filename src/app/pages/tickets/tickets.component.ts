import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITicket } from 'src/app/models/ticket';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
})
export class TicketsComponent implements OnInit {

  form = new FormGroup<any>({
    appointmentId: new FormControl(null, [Validators.required]),
    patientId: new FormControl(null, [Validators.required]),
  });


  constructor(public service: DataService) {
  }

  ngOnInit(): void { }

  submitTicket() {
    let data = this.form.value
    this.service.addTicket(data)
    this.form.reset()
  }

  startTicket(t: ITicket) {
    this.service.changeTicketStatus(t.id, 'STARTED')
  }
  
  holdTicket(t: ITicket) {
    this.service.changeTicketStatus(t.id, 'ON_HOLD')
  }

  completeTicket(t: ITicket) {
    this.service.changeTicketStatus(t.id, 'DONE')
  }

  queueTicket(t: ITicket) {
    this.service.changeTicketStatus(t.id, 'WAITING')
  }
}

