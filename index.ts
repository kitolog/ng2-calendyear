import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CalendyearComponent} from "./src/calendyear.component";
import {CalendarComponent} from "./src/calendar.component";
import {MonthService} from "./src/month.service";
import {AppointmentsService} from "./src/appointments.service";
import {MaterialModule} from "@angular/material";

export * from './src/calendyear.component';
export * from './src/month.service';
export * from './src/appointments.service';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    CalendyearComponent,
    CalendarComponent,
  ],
  exports: [
    CalendyearComponent,
  ]
})
export class CalendyearModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CalendyearModule,
      providers: [MonthService, AppointmentsService]
    };
  }
}
