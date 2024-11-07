import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  exports: [
    MatFormFieldModule,
    MatSlideToggleModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    MatDatepickerModule
  ],
  imports: [
    MatFormFieldModule,
    MatSlideToggleModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    MatDatepickerModule
  ],
})

export class MaterialModule {}
