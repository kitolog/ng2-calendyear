import {Component, Input, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import Calendar from './bootstrap-year-calendar';

@Component({
  selector: 'calendyear',
  template: `<div class="calendar"></div>`
})
export class CalendyearComponent implements AfterViewInit {

  @Input() appointmentsList: any[];
  @Input() devMode: boolean = false;

  $calendar: any;

  constructor(public dialog: MdDialog) {
  }

  ngAfterViewInit() {
    console.log('AFTER INIT!');
    this.$calendar = new Calendar(
      '.calendar',
      {
        enableContextMenu: true,
        enableRangeSelection: true,
        contextMenuItems: [
          {
            text: 'Update',
            click: this.ed
          },
          {
            text: 'Delete',
            click: deleteEvent
          }
        ],
        selectRange: function (e: any) {
          editEvent({startDate: e.startDate, endDate: e.endDate});
        },
        mouseOnDay: function (e: any) {
          if (e.events.length > 0) {
            console.log('mouseOnDay', e);
          }
          //   var content = '';
          //
          //   for (var i in e.events) {
          //     content += '<div class="event-tooltip-content">'
          //       + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].name + '</div>'
          //       + '<div class="event-location">' + e.events[i].location + '</div>'
          //       + '</div>';
          //   }
          //
          //   jQuery(e.element).popover({
          //     trigger: 'manual',
          //     container: 'body',
          //     html: true,
          //     content: content
          //   });
          //
          //   jQuery(e.element).popover('show');
          // }
        },
        mouseOutDay: function (e: any) {
          if (e.events.length > 0) {
            console.log('mouseOnDay', e);
            // jQuery(e.element).popover('hide');
          }
        },
        dayContextMenu: function (e) {
          console.log('dayContextMenu', e);
          // jQuery(e.element).popover('hide');
        },
        dataSource: [
          {
            id: 0,
            name: 'Google I/O',
            location: 'San Francisco, CA',
            startDate: new Date(currentYear, 4, 28),
            endDate: new Date(currentYear, 4, 29)
          },
          {
            id: 1,
            name: 'Microsoft Convergence',
            location: 'New Orleans, LA',
            startDate: new Date(currentYear, 2, 16),
            endDate: new Date(currentYear, 2, 19)
          },
          {
            id: 2,
            name: 'Microsoft Build Developer Conference',
            location: 'San Francisco, CA',
            startDate: new Date(currentYear, 3, 29),
            endDate: new Date(currentYear, 4, 1)
          },
          {
            id: 3,
            name: 'Apple Special Event',
            location: 'San Francisco, CA',
            startDate: new Date(currentYear, 8, 1),
            endDate: new Date(currentYear, 8, 1)
          },
          {
            id: 4,
            name: 'Apple Keynote',
            location: 'San Francisco, CA',
            startDate: new Date(currentYear, 8, 9),
            endDate: new Date(currentYear, 8, 9)
          },
          {
            id: 5,
            name: 'Chrome Developer Summit',
            location: 'Mountain View, CA',
            startDate: new Date(currentYear, 10, 17),
            endDate: new Date(currentYear, 10, 18)
          },
          {
            id: 6,
            name: 'F8 2015',
            location: 'San Francisco, CA',
            startDate: new Date(currentYear, 2, 25),
            endDate: new Date(currentYear, 2, 26)
          },
          {
            id: 7,
            name: 'Yahoo Mobile Developer Conference',
            location: 'New York',
            startDate: new Date(currentYear, 7, 25),
            endDate: new Date(currentYear, 7, 26)
          },
          {
            id: 8,
            name: 'Android Developer Conference',
            location: 'Santa Clara, CA',
            startDate: new Date(currentYear, 11, 1),
            endDate: new Date(currentYear, 11, 4)
          },
          {
            id: 9,
            name: 'LA Tech Summit',
            location: 'Los Angeles, CA',
            startDate: new Date(currentYear, 10, 17),
            endDate: new Date(currentYear, 10, 17)
          }
        ],
      }
  }

  addAppointment() {
    let dialogRef = this.dialog.open(AppointmentDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log('RESULT', result);
      // this.selectedOption = result;
    });
  }

  editAppointment() {
    let dialogRef = this.dialog.open(AppointmentDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log('RESULT', result);
      // this.selectedOption = result;
    });
  }

  deleteAppointment() {
    let dialogRef = this.dialog.open(AppointmentDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log('RESULT', result);
      // this.selectedOption = result;
    });
  }
}

@Component({
  selector: 'dialog-result-example-dialog',
  template: `
            <h2 md-dialog-title>Neptune</h2>
            <md-dialog-content>
            
            </md-dialog-content>
            <md-dialog-actions [attr.align]="actionsAlignment">
              <button
                md-raised-button
                color="primary"
                md-dialog-close>Close</button>
              <a
                md-button
                color="primary"
                href="https://en.wikipedia.org/wiki/Neptune"
                target="_blank">Read more on Wikipedia</a>
              <button
                md-button
                color="secondary"
                (click)="showInStackedDialog()">
                OK</button>
            </md-dialog-actions>
        <p>{{ message }}</p>
        <button type="button" md-raised-button 
            (click)="dialogRef.close(true)">OK</button>
        <button type="button" md-button 
            (click)="dialogRef.close()">Cancel</button>
    `,
})
export class AppointmentDialog {
  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<AppointmentDialog>) {
  }
}
