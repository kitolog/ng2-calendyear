import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import Calendar from './bootstrap-year-calendar';
import {MonthService} from './month.service';

@Component({
  selector: 'calendar',
  template: `
    <md-grid-list cols="3" rowHeight="250px">
      <md-grid-tile
          *ngFor="let month of monthService.getMonths()"
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
                  *ngFor="let day of month.days"
                  [colspan]="1"
                  [rowspan]="1">
                  {{day}}
              </md-grid-tile>
          </md-grid-list>
      </md-grid-tile>
    </md-grid-list>
  `,
  styles: [`
    md-grid-tile figure {
      align-items: flex-start;
    }
  `]
})
export class CalendarComponent implements OnInit {


  // @Input() appointmentsList: any[];
  // @Input() devMode: boolean = false;

  data: any[];

  constructor(public monthService: MonthService,) {
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
