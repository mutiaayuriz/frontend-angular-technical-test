import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-edit',
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
    TitleCasePipe,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  @ViewChild(MatSelect) matSelect: MatSelect | undefined;

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

  editForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    basicSalary: new FormControl(0, [Validators.required, Validators.min(1)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    status: new FormControl('single', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  maxDate = new Date();
  selectedOption: string = 'single';
  radioButtonOptions = ['single', 'married'];

  ngOnInit(): void {
    this.filteredGroup = this.groupDummy;
    this.editForm.get('username')?.setValue(this.data?.username);
    this.editForm.get('firstName')?.setValue(this.data?.firstName);
    this.editForm.get('lastName')?.setValue(this.data?.lastName);
    this.editForm.get('basicSalary')?.setValue(this.data?.basicSalary);
    this.editForm.get('email')?.setValue(this.data?.email);
    this.editForm.get('status')?.setValue(this.data?.status);
    this.editForm.get('birthDate')?.setValue(this.data?.birthDate);
    this.editForm.get('group')?.setValue(this.data?.group);
    this.editForm.get('description')?.setValue(this.data?.description);
    this.selectedOption = this.data.status;
  }

  searchGroup(event: Event) {
    let search = (event.target as HTMLInputElement).value;
    if (search.length > 0) {
      let keyword = search.trim().toLowerCase();
      this.filteredGroup = this.filteredGroup.filter((value: any) =>
        value.id.includes(keyword)
      );
    } else {
      this.filteredGroup = this.groupDummy;
    }
  }

  submit(): void {
    this.dialogRef.close(this.editForm);
  }
}
