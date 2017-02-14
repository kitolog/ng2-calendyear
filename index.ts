import {NgModule, ModuleWithProviders, ElementRef } from "@angular/core";
import {CommonModule} from "@angular/common";
import {CalendyearComponent} from "./src/calendyear.component";
import {CalendarComponent} from "./src/calendar.component";
import {EditDialog} from './src/editDialog.component';
import {MonthService} from "./src/month.service";
import {AppointmentsService} from "./src/appointments.service";
import {MaterialModule} from "@angular/material";
import {CalendarService} from './src/calendar.service';
import { FormsModule } from '@angular/forms';
import { MdlExpansionPanelModule } from '@angular2-mdl-ext/expansion-panel';
import {TextMaskModule} from 'angular2-text-mask';
import {SidebarComponent} from "./src/sidebar.component";
import { MdlModule } from 'angular2-mdl';
//sdfsdfsf
export * from './src/calendyear.component';
export * from './src/month.service';
export * from './src/appointments.service';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MdlExpansionPanelModule,
    MdlModule,
    TextMaskModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    CalendyearComponent,
    CalendarComponent,
    SidebarComponent,
    EditDialog
  ],
  exports: [
    CalendyearComponent,
  ],
  entryComponents:[
    EditDialog,
  ]
})

export class CalendyearModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CalendyearModule,
      providers: [MonthService, AppointmentsService, CalendarService, ElementRef]
    };
  }
}

