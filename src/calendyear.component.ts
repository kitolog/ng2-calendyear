import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
// import Calendar from './bootstrap-year-calendar';
import {MonthService} from './month.service';

@Component({
  selector: 'calendyear',
  providers:[MonthService],
  template: `
    <calendar></calendar>
  `
})
export class CalendyearComponent implements OnInit {

  @Input() appointmentsList: any[];
  @Input() devMode: boolean = false;

  data: any[];

  constructor(public dialog: MdDialog) {
    this.data = [
      {
        Name: 'Google I/O',
        DateFrom: new Date(2017, 4, 28),
        DateTo: new Date(2017, 4, 29)
      }
    ];
  }

  ngOnInit() {

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
