import {Component, Input, Output, OnInit, ViewEncapsulation} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {MonthService} from './month.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CalendarService} from './calendar.service';
import {Appointment} from './appointment.model';

@Component({
  selector: 'calendar',
  template: `
    <md-grid-list cols="3" rowHeight="250px">
      <md-grid-tile
          *ngFor="let month of calendarDates"
          [colspan]="1"
          [rowspan]="1">
          <md-grid-list [style.width]="'90%'" cols="7" rowHeight="30px">
              <md-grid-tile
                  [colspan]="7"
                  [rowspan]="1">
                  {{month.name}}
              </md-grid-tile>
              <md-grid-tile 
                  *ngFor="let weekday of month.weekdays"
                  [colspan]="1"
                  [rowspan]="1">
                  {{weekday}}
              </md-grid-tile>
              <md-grid-tile
                  (click)="dayClicked(day)"
                  class="day-cell"
                  *ngFor="let day of month.days"
                  [colspan]="1"
                  [rowspan]="1"
                  [class.selected]="day.isSelected"
                  [style.background-color]="day.color">
                  {{day.date}}
              </md-grid-tile>
          </md-grid-list>
      </md-grid-tile>
    </md-grid-list>
  `,
  styles: [`
  `]
})
export class CalendarComponent implements OnInit {

  @Output()
    // @Input() appointmentsList: any[];
    // @Input() devMode: boolean = false;

  calendarDates: any[];
  data: any[];

  constructor(public monthService: MonthService, public сalendarService: CalendarService) {
    this.data = [
      {
        Name: 'Google I/O',
        DateFrom: new Date(2017, 4, 28),
        DateTo: new Date(2017, 4, 29)
      }
    ];
  }

  ngOnInit() {
    this.reloadCalendarDates();
    this.сalendarService.appointmentsDays$.subscribe((appointmentDays) => {
      this.drawAppointmentDays(appointmentDays)
    })
  }

  reloadCalendarDates() {
    this.calendarDates = this.monthService.getMonths();
  }

  drawAppointmentDays(appointmentDays) {
    this.calendarDates.map(month => {
      month.days.map((day: any) => {
        if (day && day.momentDate && appointmentDays.get(day.momentDate.format('YYYY-MM-DD'))) {
          day.isSelected = true;
        } else if (day) {
          day.isSelected = false;
        }
      })
    });
  }

  dayClicked(day) {
    this.сalendarService.clickDay(day);
    //console.log('day', day);
  }
}
