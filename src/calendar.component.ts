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
                  [class.selected]="day.type"
                  [style.background]="getDayColor(day)">
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
    console.log('INIT');
    this.drawAppointmentDays(this.сalendarService.appointmentsDays)
    this.сalendarService.appointmentsDays$.subscribe((appointmentDays) => {
      this.drawAppointmentDays(appointmentDays)
    })

    this.monthService.year$.subscribe((year) => {
      this.reloadCalendarDates();
    })
  }

  reloadCalendarDates() {
    this.calendarDates = this.monthService.getMonths();
  }

  getDayColor(day: any) {
    let color = '#fff';
    if (day) {
      color = '#7aba7a';
      if (day.type) {
        // color = 'rgba(200, 87, 98, ' + day.opacity + ')';
        // color = 'rgb(200, 87, 98)';
        color = '#c85762';
        switch (day.type) {
          case 'start':
            color = 'linear-gradient(to bottom right, #7aba7a 0%, #7aba7a 50%, ' + color + ' 50%, ' + color + ' 100%)';
            break;

          case 'end':
            color = 'linear-gradient(to bottom right, ' + color + ' 0%, ' + color + ' 50%, #7aba7a 50%, #7aba7a 100%)';
            break;
        }
      }
    }
    return color;
  }

  drawAppointmentDays(appointmentDays: any) {
    console.log('DRAW');
    console.log('DRAW-NEW');
    console.log(this.сalendarService.appointmentsDays);
    this.calendarDates.map(month => {
      month.days.map((day: any, index: number) => {
        if (day && day.momentDate && appointmentDays.get(day.momentDate.format('YYYY-MM-DD'))) {
          if ((index === 0) || !month.days[index - 1]['appointments']) {
            day.type = 'start';
          } else {
            day.type = 'step';
          }

          day['appointments'] = appointmentDays.get(day.momentDate.format('YYYY-MM-DD'));
          console.log('APPP', appointmentDays.get(day.momentDate.format('YYYY-MM-DD')));
          day.opacity = 0.5 + appointmentDays.get(day.momentDate.format('YYYY-MM-DD')).length * 0.2;
          if (day.opacity > 1) {
            day.opacity = 1;
          }
          // if(){
          //
          // }
        } else if (day) {
          if ((index !== 0) && month.days[index - 1]['appointments']) {
            day.type = 'end';
          }
        }
      })
    });
  }

  dayClicked(day: any) {
    this.сalendarService.clickDay(day);
    //console.log('day', day);
  }
}
