import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  TitleCasePipe
} from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyPipe,
    DatePipe,
    TitleCasePipe
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  providers: [MatDatepickerModule],
})
export class AddComponent implements OnInit {
  @ViewChild(MatSelect) matSelect: MatSelect | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  public groupDummy = [
    { name: 'Abc', id: 'abc' },
    { name: 'Def', id: 'def' },
    { name: 'Hij', id: 'hij' },
    { name: 'Klm', id: 'klm' },
    { name: 'Opq', id: 'opq' },
    { name: 'Rst', id: 'rst' },
    { name: 'Uvw', id: 'uvw' },
    { name: 'Xyz', id: 'xyz' },
    { name: 'Grup A', id: 'groupa' },
    { name: 'Grup B', id: 'groupb' },
  ];

  public filteredGroup: any = [];

  addForm = new FormGroup({
    userNameFormControl: new FormControl('', [Validators.required]),
    firstNameFormControl: new FormControl('', [Validators.required]),
    lastNameFormControl: new FormControl('', [Validators.required]),
    salaryFormControl: new FormControl(0, [Validators.required, Validators.min(1)]),
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    statusFormControl: new FormControl('single', [Validators.required]),
    birthDateFormControl: new FormControl('', [Validators.required]),
    groupFormControl: new FormControl('', [Validators.required]),
    descriptionFormControl: new FormControl('', [Validators.required]),
  });

  maxDate = new Date();
  selectedOption: string = 'single';
  radioButtonOptions = ['single', 'married'];

  ngOnInit(): void {
    this.filteredGroup = this.groupDummy;
  }

  searchGroup(event: Event) {
    let search = (event.target as HTMLInputElement).value;
    if (search.length > 0) {
      let keyword = search.trim().toLowerCase();
      this.filteredGroup = this.filteredGroup.filter((value: any) => value.id.includes(keyword));
    } else {
      this.filteredGroup = this.groupDummy;
    }
  }

  back() {
    this.router.navigate(['/list']);
  }

  onSubmit() {
    this.router.navigateByUrl('/list');
  }

}
