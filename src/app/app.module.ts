import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { TextUpperCasePipe } from './pipe/textUppercase.pipe';

@NgModule({
  declarations: [TextUpperCasePipe],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule
  ],

})
export class AppModule { }
