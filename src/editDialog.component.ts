import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import moment from 'moment';

@Component({
  selector: 'edit-dialog',
  template: `
  <p>Name</p>
  <input [(ngModel)]="name">
  <p>Start</p>
  <input [(ngModel)]="start">
  <p>End</p>
  <input [(ngModel)]="end">
  <button type="button" (click)="closeAndSave()">Close and Save</button>`
})

export class EditDialog{
  startDate: any;
  endDate: any;
  start: string;
  end: string = '';
  name: string = 'jhjfg';
  id: string = '';
  constructor(public dialogRef: MdDialogRef<EditDialog>) {

  }

  ngOnInit() {
    console.log('Init      !!!!');
    console.log('inittting this.startDate', this.startDate.format('YYYY-MM-DD'));
    console.log('inittting this.endDate', this.endDate);

    this.start = this.startDate.format('YYYY-MM-DD');
    this.end = this.endDate? this.endDate.format('YYYY-MM-DD') : '';


  }

  formatToMoment(dateString){
    let dateArr = dateString.split('-');
    let year = dateArr[0];
    let month = dateArr[1] - 1;
    let date = dateArr[2];
    return moment().clone().set({year, month, date});
  }


  closeAndSave(){
    console.log('this.formatToMoment(this.start)', this.formatToMoment(this.start));
    let start = this.formatToMoment(this.start);
    let end = this.formatToMoment(this.end);
    this.dialogRef.close({start: start, end: end, name: this.name, id: this.id});
  }
}
