import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {EditDialog} from './editDialog.component';

import {MonthService} from './month.service';
import {CalendarService} from './calendar.service';
import {AppointmentsService} from './appointments.service';
import {Appointment} from './appointment.model';



@Component({
  styleUrls: ['../resources/main.css'],
  selector: 'calendyear',
  providers: [MonthService, CalendarService, AppointmentsService],
  template: `
    <md-grid-list cols="10" [rowHeight]="1100">
        <md-grid-tile [colspan]="7">
          <calendar></calendar>
        </md-grid-tile>
        <md-grid-tile class="aside" [colspan]="3">
          <sidebar [openEditDialog]="getEditDialog()"></sidebar>
        </md-grid-tile>      
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

  getEditDialog() {
    return (type: string, data: any) => {
      return this.openEditDialog(type, data);
    }
  }

  openEditDialog(type: string, data: any) {
    let appointment = null;
    if(data instanceof Appointment){
      appointment = data;
    }else {
      let appointmentId = this.CalendarService.appointmentsDays.get(data.momentDate.format('YYYY-MM-DD'));
      appointment = this.appointmentsService.getAppointmentById(appointmentId);
      console.log('APP', appointment, appointmentId);
    }
    this.dialogRef = this.dialog.open(EditDialog);
    if (appointment) {
      this.dialogRef.componentInstance.formData = {
        id: appointment.id,
        name: appointment.name,
        start: appointment.startDate.format('YYYY-MM-DD'),
        end: appointment.endDate.format('YYYY-MM-DD')
      };
    }
    this.dialogRef.componentInstance.startDate = data.momentDate;


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
            console.log('this.appointmentsService', this.appointmentsService);
            this.appointmentsService.removeAppointment(data);
            break;
        }
      }
      this.dialogRef = null;
    });
  }
}
