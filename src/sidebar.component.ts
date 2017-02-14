import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {EditDialog} from './editDialog.component';
import moment from 'moment';

import {AppointmentsService} from './appointments.service';

@Component({
  styleUrls: ['../resources/material-design-lite/material.min.css', '../resources/material-design-lite/expansion-panel.css'],
  selector: 'sidebar',
  template: `   
        <div layout="column" layout-align="start">        
           <mdl-expansion-panel *ngFor="let year of years; let i = index; trackBy:index" #panel> 
              <mdl-expansion-panel-header>
                <mdl-expansion-panel-header-list-content>{{year}}</mdl-expansion-panel-header-list-content>
              </mdl-expansion-panel-header>
              <mdl-expansion-panel-content>
                <mdl-expansion-panel-body>
                <md-card  *ngFor="let appointment of appointmentsDictionary.get(year); let i = index; trackBy:index">
                    <md-grid-list cols="3" rowHeight="20">
                      <md-grid-tile> {{appointment.name}} </md-grid-tile>
                      <md-grid-tile> x{{year}} </md-grid-tile>
                      <md-grid-tile> {{year}}$ </md-grid-tile>
                    </md-grid-list>
                  </md-card>
                </mdl-expansion-panel-body>
              </mdl-expansion-panel-content>
             </mdl-expansion-panel>
          </div>        
  `,
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {

  appointmentsDictionary: any;
  appointmentsList: any[];
  years: any;
  moment: any = moment;
  @Input() devMode: boolean = false;

  data: any[];
  dialogRef: MdDialogRef<EditDialog>;


  constructor(public dialog: MdDialog, private AppointmentsService: AppointmentsService) {

  }

  ngOnInit() {
    console.log('this.AppointmentsService.appointments$', this.AppointmentsService.appointments$);
    this.AppointmentsService.appointments$.subscribe( appointments => {
      this.prepareData(appointments);
      this.appointmentsList = appointments;

    });

  }

  prepareData(appointsArr){
    this.appointmentsDictionary = new Map();
    appointsArr.map( appoint => {
      let yearArr = this.appointmentsDictionary.get(appoint.startDate.year());
      if(Array.isArray(yearArr)){
        yearArr.push(appoint)
      }else{
        this.appointmentsDictionary.set(appoint.startDate.year(), [appoint]);
      }
      console.log('this.appointmentsDictionary', this.appointmentsDictionary)
    });
    this.years = Array.from(this.appointmentsDictionary.keys());
    console.log('this.years', this.years);
  }

  // openEditDialog(type: string, day: any) {
  //   this.dialogRef = this.dialog.open(EditDialog);
  //   let appointmentId = this.CalendarService.appointmentsDays.get(day.momentDate.format('YYYY-MM-DD'));
  //
  //   if(appointmentId){
  //     console.log('edit ID-', appointmentId);
  //     let appointment = this.AppointmentsService.getAppointmentById(appointmentId);
  //     console.log('edit appointment', appointment);
  //     this.dialogRef.componentInstance.startDate = appointment.startDate;
  //     this.dialogRef.componentInstance.endDate = appointment.endDate;
  //     this.dialogRef.componentInstance.name = appointment.name;
  //     this.dialogRef.componentInstance.id = appointment.id;
  //   }else{
  //     console.log('Creating!!!!');
  //     this.dialogRef.componentInstance.startDate = day.momentDate;
  //   }

    // this.dialogRef.afterClosed().subscribe(appointmentConf => {
    //   //this.lastCloseResult = result;
    //   console.log('after modal close', appointmentConf);
    //   if(appointmentConf.id){
    //     //Has ID - Edit
    //     console.log('Edit existing', appointmentConf.id);
    //     this.AppointmentsService.editAppointment(appointmentConf);
    //   }else{
    //     //No ID - new Appointment
    //     console.log('Creating new!!!!', appointmentConf);
    //     this.AppointmentsService.createNewAppointment(appointmentConf);
    //   }
    //   this.dialogRef = null;
    // });
  // }
}


