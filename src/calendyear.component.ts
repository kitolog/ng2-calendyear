import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {EditDialog} from './editDialog.component';

import {MonthService} from './month.service';
import {CalendarService} from './calendar.service';
import {AppointmentsService} from './appointments.service';

@Component({
  styleUrls: ['../resources/main.css'],
  selector: 'calendyear',
  providers: [MonthService, CalendarService, AppointmentsService],
  template: `
    <md-grid-list cols="10" [rowHeight]="1100">
        <md-grid-tile [colspan]="7">
          <calendar></calendar>
        </md-grid-tile>
        <md-grid-tile [colspan]="3"> Sidebar </md-grid-tile>
    </md-grid-list>
  `,
  encapsulation: ViewEncapsulation.None
})
export class CalendyearComponent implements OnInit {

  @Input() appointmentsList: any[];
  @Input() devMode: boolean = false;

  data: any[];
  dialogRef: MdDialogRef<EditDialog>;


  constructor(public dialog: MdDialog, private CalendarService: CalendarService, private appointmentsService: AppointmentsService) {
    this.data = [
      {
        Name: 'Google I/O',
        DateFrom: new Date(2017, 4, 28),
        DateTo: new Date(2017, 4, 29)
      }
    ];
  }

  ngOnInit() {
    this.CalendarService.dayClicked$.subscribe(day => {
      this.openEditDialog('create', day);
    })
  }

  openEditDialog(type: string, day: any) {
    this.dialogRef = this.dialog.open(EditDialog);
    let appointmentId = this.CalendarService.appointmentsDays.get(day.momentDate.format('YYYY-MM-DD'));

    if (appointmentId) {
      let appointment = this.appointmentsService.getAppointmentById(appointmentId);
      console.log('APP', appointment, appointmentId);
      if (appointment) {
        this.dialogRef.componentInstance.formData = {
          id: appointment.id,
          name: appointment.name,
          start: appointment.startDate.format('YYYY-MM-DD'),
          end: appointment.endDate.format('YYYY-MM-DD')
        };
      }
    } else {
      this.dialogRef.componentInstance.startDate = day.momentDate;
    }

    this.dialogRef.afterClosed().subscribe((data: any) => {
      console.log('CLOSE', data);
      if (data && data.action) {
        switch (data.action) {
          case 'add':
            this.appointmentsService.addAppointment(data);
            break;
          case 'edit':
            this.appointmentsService.editAppointment(data);
            break;
          case 'remove':
            this.appointmentsService.removeAppointment(data);
            break;
        }
      }
      this.dialogRef = null;
    });
  }
}
