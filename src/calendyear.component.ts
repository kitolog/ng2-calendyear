import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {EditDialog} from './editDialog.component';
import {SelectDialog} from './selectDialog.component';

import {MonthService} from './month.service';
import {CalendarService} from './calendar.service';
import {AppointmentsService} from './appointments.service';
import {Appointment} from './appointment.model';


@Component({
  styleUrls: ['../resources/main.css'],
  selector: 'calendyear',
  providers: [MonthService, CalendarService, AppointmentsService],
  template: `
<md-toolbar class="calendar-header">
    <md-select [(ngModel)]="year" name="year" (ngModelChange)="selectYear()">
      <md-option *ngFor="let year of monthService.generateYears()" [value]="year">
        {{year}}
      </md-option>
    </md-select>
    <span class="spacer"></span>
    <md-slide-toggle [checked]="showSidebar" (change)="toggleSidebar($event)">
        Sidebar
      </md-slide-toggle>
  </md-toolbar>
    <md-grid-list cols="10" [rowHeight]="1100">
        <md-grid-tile [colspan]="showSidebar ? 7 : 10" class="calendar-block">
          <calendar></calendar>
        </md-grid-tile>
        <md-grid-tile *ngIf="showSidebar" class="aside sidebar-block" [colspan]="3">
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
  year: number;
  showSidebar: boolean = true;
  dialogRef: MdDialogRef<EditDialog>;
  selectDialogRef: MdDialogRef<SelectDialog>;

  constructor(public dialog: MdDialog,
              private calendarService: CalendarService,
              private monthService: MonthService,
              private appointmentsService: AppointmentsService) {
  }

  ngOnInit() {
    this.year = this.monthService.year;
    this.calendarService.dayClicked$.subscribe((data) => {
      if (data.appointments && (data.appointments.length > 1)) {
        this.openSelectDialog(data);
      } else {
        this.openEditDialog('create', data);
      }
    });

    this.prepareAppointments();
  }

  ngDoCheck() {
    // this.prepareAppointments();
  }

  prepareAppointments() {
    if (this.appointmentsList && (this.appointmentsList.length > 0)) {
      this.appointmentsList.map((item) => {
        this.appointmentsService.addAppointment({
          start: item.DateFrom,
          end: item.DateTo,
          name: item.Name
        });
      })
    }
  }

  getEditDialog() {
    return (type: string, data: any) => {
      return this.openEditDialog(type, data);
    }
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  selectYear() {
    this.monthService.setYear(this.year);
  }

  openEditDialog(type: string, data: any) {
    let appointment = null;
    if (data instanceof Appointment) {
      appointment = data;
    } else if (data && data.momentDate) {
      let appointmentId = this.calendarService.appointmentsDays.get(data.momentDate.format('YYYY-MM-DD'));
      appointment = this.appointmentsService.getAppointmentById(appointmentId);
    }
    this.dialogRef = this.dialog.open(EditDialog);

    if (data && data.momentDate) {
      this.dialogRef.componentInstance.startDate = data.momentDate;
    }

    if (appointment) {
      this.dialogRef.componentInstance.formData = {
        id: appointment.id,
        name: appointment.name,
        start: appointment.startDate.format('YYYY-MM-DD'),
        end: appointment.endDate.format('YYYY-MM-DD')
      };
    }

    this.dialogRef.afterClosed().subscribe((data: any) => {
      if (data && data.action) {
        switch (data.action) {
          case 'add':
            this.appointmentsService.addAppointment(data);
            break;
          case 'new':
            this.dialogRef = null;
            this.openEditDialog(null, null);
            break;
          case 'edit':
            this.appointmentsService.editAppointment(data);
            break;
          case 'remove':
            this.appointmentsService.removeAppointment(data);
            break;
        }

        if (this.dialogRef !== null) {
          this.dialogRef = null;
        }
      }
    });
  }

  openSelectDialog(data: any) {
    let appointmentsData = [];
    for (let appointmentId of data.appointments) {
      let appointmentData = this.appointmentsService.getAppointmentById(appointmentId);
      if (appointmentData) {
        appointmentsData.push(appointmentData);
      }
    }

    this.selectDialogRef = this.dialog.open(SelectDialog);
    this.selectDialogRef.componentInstance.appointments = appointmentsData;

    this.selectDialogRef.afterClosed().subscribe((selectData: any) => {
      if (selectData && (typeof selectData.appointment !== 'undefined')) {
        if (selectData && selectData.hasOwnProperty('appointment')) {
          this.openEditDialog('edit', selectData.appointment);
        } else {
          this.openEditDialog('edit', data);
        }
      }
      this.selectDialogRef = null;
    });
  }
}
