import {Injectable} from '@angular/core';
import {Appointment} from './appointment.model';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import moment from 'moment';

@Injectable()
export class AppointmentsService {

  private appointments: any[] = [];
  private appointmentsMap: any = {};
  public appointments$: Observable<any> = null;
  private _appointmentsSource = new Subject<any>();

  constructor() {
    this.appointments$ = this._appointmentsSource.asObservable();
  }

  addAppointment(data: any) {
    if (!this.validateAppointment(data)) {
      console.log('INVALID!');
      return false;
    }
    let appointment = new Appointment({
      startDate: data.start,
      endDate: data.end,
      name: data.name
    });

    this.appointmentsMap[appointment.id] = this.appointments.push(appointment) - 1;
    console.log('this.appointments', this.appointments);
    this._appointmentsSource.next(this.appointments);
  }

  editAppointment(data: any) {
    if (!this.validateAppointment(data)) {
      console.log('NOT VALID EDIT');
      return false;
    }
    let appointment = this.getAppointmentById(data.id);
    if (appointment) {
      appointment.update({
        startDate: data.start,
        endDate: data.end,
        name: data.name
      });
      this.appointments[this.appointmentsMap[data.id]] = appointment;
      this._appointmentsSource.next(this.appointments);
    }
  }

  removeAppointment(data: any) {
    if (!data.id) {
      console.log('Appointment id is required');
    }
    if (this.appointmentsMap.hasOwnProperty(data.id) && this.appointments[this.appointmentsMap[data.id]]) {
      this.appointments.splice(this.appointmentsMap[data.id], 1);
      delete this.appointmentsMap[data.id];
    } else {
      console.log('not found');
    }

    this.appointments.map((item, index) => {
      this.appointmentsMap[item.id] = index;
    });
    this._appointmentsSource.next(this.appointments);
  }

  validateAppointment(data: any) {
    if (!data.hasOwnProperty('name') || !data.name || (data.name.length < 1)) {
      console.warn('name is not valid');
      return false;
    }

    if (!data.hasOwnProperty('start') || !data.start || (data.start.length < 1) || !moment(data.start).isValid()) {
      console.warn('start is not valid');
      return false;
    }

    if (!data.hasOwnProperty('end') || !data.end || (data.end.length < 1) || !moment(data.end).isValid() || (moment(data.end) < moment(data.start))) {
      console.warn('end is not valid');
      return false;
    }

    return true;
  }

  getAppointmentsById(appointmentsIds: string[]) {
    let result: Appointment[] = [];
    appointmentsIds.map((id) => {
      let appointment = this.getAppointmentById(id);
      if (appointment) {
        result.push(appointment)
      }
    });
    return result;
  }

  getAppointmentById(id: string) {
    let result: Appointment = null;
    if (this.appointmentsMap.hasOwnProperty(id) && this.appointments[this.appointmentsMap[id]]) {
      result = this.appointments[this.appointmentsMap[id]];
    }
    return result;
  }
}


