import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {EditDialog} from './editDialog.component';

import {MonthService} from './month.service';
import {CalendarService} from './calendar.service';
import {AppointmentsService} from './appointments.service';

@Component({
  styleUrls: ['../resources/main.css'],
  selector: 'calendyear',
  providers:[MonthService, CalendarService, AppointmentsService],
  template: `
    <calendar></calendar>
  `,
  encapsulation: ViewEncapsulation.None
})
export class CalendyearComponent implements OnInit {

  @Input() appointmentsList: any[];
  @Input() devMode: boolean = false;

  data: any[];
  dialogRef: MdDialogRef<EditDialog>;


  constructor(public dialog: MdDialog, private CalendarService: CalendarService, private AppointmentsService: AppointmentsService) {
    this.data = [
      {
        Name: 'Google I/O',
        DateFrom: new Date(2017, 4, 28),
        DateTo: new Date(2017, 4, 29)
      }
    ];
  }

  ngOnInit() {
    this.CalendarService.dayClicked$.subscribe( day => {
      this.openEditDialog('create', day);
    })
  }

  openEditDialog(type: string, day: any) {
    this.dialogRef = this.dialog.open(EditDialog);
    let appointmentId = this.CalendarService.appointmentsDays.get(day.momentDate.format('YYYY-MM-DD'));

    if(appointmentId){
      console.log('edit ID-', appointmentId);
      let appointment = this.AppointmentsService.getAppointmentById(appointmentId);
      console.log('edit appointment', appointment);
      this.dialogRef.componentInstance.startDate = appointment.startDate;
      this.dialogRef.componentInstance.endDate = appointment.endDate;
      this.dialogRef.componentInstance.name = appointment.name;
      this.dialogRef.componentInstance.id = appointment.id;
    }else{
      console.log('Creating!!!!');
      this.dialogRef.componentInstance.startDate = day.momentDate;
    }
    //let appointmentId = this.CalendarService.appointmentsDays.get(day.momentDate.format('YYYY-MM-DD'));
    // if(appointmentId){
    //   console.log('EITING!!!!!!!');
    //   let appointment = this.AppointmentsService.getAppointmentById(appointmentId);
    //   this.dialogRef.componentInstance.startDate = appointment.startDate;
    //   // this.dialogRef.componentInstance.endDate = appointment.endDate;
    //   // this.dialogRef.componentInstance.id = appointment.id;


    this.dialogRef.afterClosed().subscribe(appointmentConf => {
      //this.lastCloseResult = result;
      console.log('after modal close', appointmentConf);
      if(appointmentConf.id){
        //Has ID - Edit
        console.log('Edit existing', appointmentConf.id);
        this.AppointmentsService.editAppointment(appointmentConf);
      }else{
        //No ID - new Appointment
        console.log('Creating new!!!!', appointmentConf);
        this.AppointmentsService.createNewAppointment(appointmentConf);
      }
      this.dialogRef = null;
    });
  }


  // addAppointment() {
  //   let dialogRef = this.dialog.open(AppointmentDialog);
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('RESULT', result);
  //     // this.selectedOption = result;
  //   });
  // }
  //
  // editAppointment() {
  //   let dialogRef = this.dialog.open(AppointmentDialog);
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('RESULT', result);
  //     // this.selectedOption = result;
  //   });
  // }
  //
  // deleteAppointment() {
  //   let dialogRef = this.dialog.open(AppointmentDialog);
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('RESULT', result);
  //     // this.selectedOption = result;
  //   });
  // }
}


//
// @Component({
//   selector: 'dialog-result-example-dialog',
//   template: `
//             <h2 md-dialog-title>Neptune</h2>
//             <md-dialog-content>
//
//             </md-dialog-content>
//             <md-dialog-actions [attr.align]="actionsAlignment">
//               <button
//                 md-raised-button
//                 color="primary"
//                 md-dialog-close>Close</button>
//               <a
//                 md-button
//                 color="primary"
//                 href="https://en.wikipedia.org/wiki/Neptune"
//                 target="_blank">Read more on Wikipedia</a>
//               <button
//                 md-button
//                 color="secondary"
//                 (click)="showInStackedDialog()">
//                 OK</button>
//             </md-dialog-actions>
//         <p>{{ message }}</p>
//         <button type="button" md-raised-button
//             (click)="dialogRef.close(true)">OK</button>
//         <button type="button" md-button
//             (click)="dialogRef.close()">Cancel</button>
//     `,
// })
// export class AppointmentDialog {
//   public title: string;
//   public message: string;
//
//   constructor(public dialogRef: MdDialogRef<AppointmentDialog>) {
//   }
// }
