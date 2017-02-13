import { Injectable } from '@angular/core';
import { Appointment } from './appointment.model.ts';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AppointmentsService {

  private appointments: any[] = [];
  public appointments$: Observable<any> = null;
  private _appointmentsSource = new Subject<any>();

  constructor() {
    this.appointments$ = this._appointmentsSource.asObservable();
  }

  createNewAppointment(config){
    // console.log('config.start', config.start.format());
    // console.log('config.end', config.end.format());
    // console.log('new Appointment', new Appointment({startDate: config.start, endDate: config.end, name: config.name}));
    this.appointments.push(new Appointment({startDate: config.start, endDate: config.end, name: config.name}));
    console.log('this.appointments', this.appointments);
    this._appointmentsSource.next(this.appointments);
  }

  editAppointment(appointmentConf){
    let appointment = this.getAppointmentById(appointmentConf.id);
    console.log('Appointment to edit:', appointment);
  }

  getAppointmentsById(appointmentsIds: string[]){
    let res = [];
    appointmentsIds.map(id => {
     let appointment = this.getAppointmentById(id);
      if(appointment){
        res.push(appointment)
      }
    });
    return res;
  }

  getAppointmentById(id: string){
    let res = '';
    this.appointments.map( appointment => {if (appointment.id === id) res = appointment});
    return res;
  }
}


