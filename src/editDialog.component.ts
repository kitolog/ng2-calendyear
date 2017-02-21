import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {DatePickerOptions, DateModel} from 'ng2-datepicker';
import moment from 'moment';

@Component({
  selector: 'edit-dialog',
  template: `
  <div class="calendyar-dialog">
      <md-input-container class="full-width">
        <input class="input-wide" [(ngModel)]="formData.name" mdInput placeholder="Name">
      </md-input-container>
      <div class="input-row">
        <md-input-container class="half-width">
          <input [textMask]="{mask: dateMask}" [(ngModel)]="formData.start" mdInput placeholder="Start">
        </md-input-container>
        <md-input-container class="half-width">
          <input [textMask]="{mask: dateMask}" [(ngModel)]="formData.end" mdInput placeholder="End">
        </md-input-container>
      </div>
      <div class="buttons-row">
        <button md-raised-button (click)="cancel()">Cancel</button>
        <button md-raised-button (click)="createNew()">Add new</button>
        <button
          *ngIf="formData.id"
          md-raised-button color="warn" (click)="remove()">Remove</button>
        <button md-raised-button color="primary" (click)="save()">Save</button>
      </div>
  </div>`
})

export class EditDialog {
  startDate: any;
  endDate: any;
  dateMask: any[] = [];
  formData: any = {
    id: '',
    name: '',
    start: '',
    end: ''
  };

  constructor(public dialogRef: MdDialogRef<EditDialog>) {
  }

  ngOnInit() {
    this.dateMask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
    if (this.startDate) {
      this.formData.start = this.startDate.format('YYYY-MM-DD');
      this.formData.end = this.startDate.format('YYYY-MM-DD');
    }

    if (this.endDate) {
      this.formData.end = this.endDate.format('YYYY-MM-DD');
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }

  remove() {
    this.dialogRef.close({action: 'remove', id: this.formData.id});
  }

  validateDates(start: string, end: string) {
    this.dialogRef.close();
  }

  createNew() {
    this.dialogRef.close({
      action: 'new'
    });
  }

  save() {
    this.dialogRef.close({
      start: this.formData.start,
      end: this.formData.end,
      name: this.formData.name,
      id: this.formData.id,
      action: this.formData.id ? 'edit' : 'add'
    });
  }
}
