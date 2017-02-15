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
                    <md-grid-list cols="14" rowHeight="30">
                      <md-grid-tile [colspan]="10" class="appointment-item"> 
                        <md-grid-list  [style.height]="'100%'" [style.width]="'100%'" [style.font-size]="'13px'" cols="1" rowHeight="15">
                          <md-grid-tile [colspan]="1" [rowspan]="1">
                            {{appointment.name}}
                          </md-grid-tile>
                          <md-grid-tile [colspan]="1" [rowspan]="1">
                            {{getYear(appointment.startDate)}} - {{getYear(appointment.endDate)}}
                          </md-grid-tile>
                        </md-grid-list>
                      </md-grid-tile>
                      <md-grid-tile [colspan]="2" class="appointment-action">                       
                         <md-icon (click)="edit(appointment)" class="md-24">edit</md-icon>                      
                      </md-grid-tile>
                      <md-grid-tile [colspan]="2" class="appointment-action">                      
                        <md-icon (click)="remove(appointment)" class="md-24">close</md-icon>                    
                      </md-grid-tile>
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
  @Input() openEditDialog: any;

  data: any[];
  dialogRef: MdDialogRef<EditDialog>;


  constructor(public dialog: MdDialog, private appointmentsService: AppointmentsService) {

  }

  ngOnInit() {
    this.prepareData(this.appointmentsService.appointments);
    this.appointmentsService.appointments$.subscribe(appointments => {
      this.prepareData(appointments);
      this.appointmentsList = appointments;
    });

  }

  getYear(date) {
    return date.format('YYYY-MM-DD');
  }

  prepareData(appointsArr) {
    this.appointmentsDictionary = new Map();
    appointsArr.map(appoint => {
      let yearArr = this.appointmentsDictionary.get(appoint.startDate.year());
      if (Array.isArray(yearArr)) {
        yearArr.push(appoint)
      } else {
        this.appointmentsDictionary.set(appoint.startDate.year(), [appoint]);
      }
    });
    this.years = Array.from(this.appointmentsDictionary.keys());
  }

  remove(appointment) {
    this.appointmentsService.removeAppointment(appointment);
  }

  edit(appointment) {
    this.openEditDialog('edit', appointment);
  }
}


