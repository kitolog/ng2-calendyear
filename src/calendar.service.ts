import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {AppointmentsService} from './appointments.service';
import {Appointment} from './appointment.model';

@Injectable()
export class CalendarService {

  public dayClicked$: Observable<any> = null;
  private _clickedDaySource = new Subject<any>();
  public appointmentsDays$: Observable<any> = null;
  private _appointmentsDaysSource = new Subject<any>();
  public appointmentsDays: any = new Map();

  constructor(private appointmentsService: AppointmentsService) {
    this.dayClicked$ = this._clickedDaySource.asObservable();
    this.appointmentsDays$ = this._appointmentsDaysSource.asObservable();
    this.appointmentsService.appointments$.subscribe(newAppointments => {
      this.setAppointmentDays(newAppointments)
    });
  }

  setAppointmentDays(appointments: Appointment[]) {
    this.appointmentsDays = new Map();
    appointments.map((appointment) => {
      let endDay = appointment.endDate;
      let startDay = appointment.startDate.clone();
      while (!startDay.isSame(endDay)) {
        this.appointmentsDays.set(startDay.format('YYYY-MM-DD'), appointment.id);
        startDay.add(1, 'day');
      }
      this.appointmentsDays.set(endDay.format('YYYY-MM-DD'), appointment.id);
    });
    this._appointmentsDaysSource.next(this.appointmentsDays);
  }

  clickDay(day: any) {
    this._clickedDaySource.next(day);
  }

  hasEvent(momentDate) {
    if (momentDate) {
      if (this.appointmentsDays.get(momentDate.format('YYYY-MM-DD'))) {
        return 'green';
      }
    }
  }
}
