import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {AppointmentsService} from './appointments.service';

@Component({
  selector: 'select-dialog',
  template: `
  <div class="calendyar-dialog select-dialog">
      <h1 md-dialog-title>Select appointment</h1>
      <md-list>
         <md-list-item 
         *ngFor="let appointment of appointments"
         (click)="save(appointment)"
         >{{appointment.name}}</md-list-item>
      </md-list>
      <div class="buttons-row">
        <button md-raised-button (click)="cancel()">Cancel</button>
        <button md-raised-button color="primary" (click)="save(null)">Add new</button>
      </div>
  </div>`
})

export class SelectDialog {
  appointments: any[];
  appointment: any;

  constructor(public dialogRef: MdDialogRef<SelectDialog>) {
  }

  ngOnInit() {
    this.appointment = this.appointments[0];
  }

  cancel() {
    this.dialogRef.close(null);
  }

  save(appointment: any) {
    this.dialogRef.close({
      appointment: appointment
    });
  }
}
