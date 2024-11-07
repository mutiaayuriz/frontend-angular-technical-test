import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MaterialModule } from '../material.module';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

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
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  providers: [MatDatepickerModule],
})
export class AddComponent implements OnInit {
  @ViewChild(MatSelect) matSelect: MatSelect | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  public groupCtrl: FormControl = new FormControl();
  public groupFilterCtrl: FormControl = new FormControl();
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

  public filteredBanks: [] = [];

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
    birthDateFormControl: new FormControl('', [Validators.required, ]),
  });

  selectedOption: string = 'single';
  radioButtonOptions = ['single', 'married'];
  maxDate = new Date();
  ngOnInit(): void {

  }

  filterBanks() {
    if (!this.groupDummy) {
      return;
    }

    // get the search keyword
    let search = this.groupFilterCtrl.value;

  }

  back() {
    this.router.navigate(['/list']);
  }

  onSubmit() {
    this.router.navigateByUrl('/list');
  }

}
