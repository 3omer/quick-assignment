import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppointment } from 'src/app/models/appointment';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html'
})
export class AppointmentsComponent implements OnInit {
  toAdd = new FormGroup({
    id: new FormControl(1, [Validators.required]),
    doctorId: new FormControl(null, [Validators.required]),
    duration: new FormControl(45, [Validators.required]),
  });

  form = new FormArray<FormGroup>([], [Validators.required]);
  constructor(public service: DataService) {}

  ngOnInit(): void {}

  getAppointmentGroup(init: IAppointment): FormGroup {
    const f = new FormGroup({
      id: new FormControl(),
      doctorId: new FormControl(),
      duration: new FormControl(),
    });
    f.patchValue(init);
    return f;
  }

  addLine() {
    let app = this.toAdd.value as IAppointment;
    this.form.push(this.getAppointmentGroup(app));
    this.toAdd.reset();
    this.toAdd.get('id')?.setValue(app.id + 1);
  }

  removeLine(i: number) {
    this.form.removeAt(i);
  }

  save() {
    const form = this.form.value
    this.service.addAppointments(form)
    this.form.clear()
    this.form.reset()
  }
}
