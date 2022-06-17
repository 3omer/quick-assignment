import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { TicketsComponent } from './pages/tickets/tickets.component';

const routes: Route[] = [
  { path: '', redirectTo: 'appointments', pathMatch: 'full' },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'tickets', component: TicketsComponent },
];
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
    AppointmentsComponent,
    TicketsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
