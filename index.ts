import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CalendyearComponent} from "./src/calendyear.component";
import {SampleDirective} from "./src/sample.directive";
import {SamplePipe} from "./src/sample.pipe";
import {SampleService} from "./src/sample.service";

export * from './src/calendyear.component';
export * from './src/sample.directive';
export * from './src/sample.pipe';
export * from './src/sample.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CalendyearComponent,
    SampleDirective,
    SamplePipe
  ],
  exports: [
    CalendyearComponent,
    SampleDirective,
    SamplePipe
  ]
})
export class CalendyearModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CalendyearModule,
      providers: [SampleService]
    };
  }
}
