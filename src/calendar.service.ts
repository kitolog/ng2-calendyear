import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {AppointmentsService} from './appointments.service';
import {Appointment} from './appointment.model';
import {MonthService} from './month.service';

@Injectable()
export class CalendarService {

  public dayClicked$: Observable<any> = null;
  private _clickedDaySource = new Subject<any>();
  public appointmentsDays$: Observable<any> = null;
  private _appointmentsDaysSource = new Subject<any>();
  public appointmentsDays: any = new Map();
  public year: number;
  public years: number[];

  constructor(private appointmentsService: AppointmentsService,
              private monthService: MonthService) {
    this.dayClicked$ = this._clickedDaySource.asObservable();
    this.appointmentsDays$ = this._appointmentsDaysSource.asObservable();
    this.appointmentsService.appointments$.subscribe(newAppointments => {
      this.setAppointmentDays(newAppointments)
    });

    this.year = monthService.year;
    this.years = monthService.generateYears();
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

  selectYear(year: number) {
    console.log('YEAR', year);
    // this._clickedDaySource.next(year);
  }

  hasEvent(momentDate) {
    if (momentDate) {
      if (this.appointmentsDays.get(momentDate.format('YYYY-MM-DD'))) {
        return 'green';
      }
    }
  }
}
