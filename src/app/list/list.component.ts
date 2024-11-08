import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';
import { Employee } from '../service/interface/list.interface';
import { MaterialModule } from '../material.module';
import * as dataEmployee from '../../../db.json';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MaterialModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CurrencyPipe,
    DatePipe,
    TitleCasePipe,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, public dialog: MatDialog) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  public type: string = 'list';
  public keyword: string = '';
  displayedColumns: string[] = [
    'userName',
    'firstName',
    'lastName',
    'email',
    'birthDate',
    'basicSalary',
    'status',
    'group',
    'description',
    'action',
  ];

  list: Employee[] = dataEmployee.employee;
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource(this.list);
  dataSelected: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  rupiahFormat(value: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.keyword = filterValue;
    if (filterValue.length > 1 || filterValue === '') {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  detailEmployee(row: Employee) {
    this.type = 'detail';
    this.dataSelected = row;
  }

  back() {
    this.type = 'list';
  }

  addEmployee() {
    this.router.navigateByUrl('/add');
  }

  editEmployee(row: Employee) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '400px',
      maxHeight: '100%',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'cancel') {
        let dataChanges = result.value;
        const updatedEmployee = this.list.map((emp) => {
          if (emp.username === row.username) {
            return {
              ...emp,
              username: dataChanges.username,
              firstName: dataChanges.firstName,
              lastName: dataChanges.lastName,
              basicSalary: dataChanges.basicSalary,
              email: dataChanges.email,
              status: dataChanges.status,
              group: dataChanges.group,
              birthDate: dataChanges.birthDate,
              description: dataChanges.description,
            };
          } else {
            return emp;
          }
        });
        this.list = updatedEmployee;
        this.dataSource = new MatTableDataSource(updatedEmployee);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  deleteEmployee(row: Employee): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      minWidth: '300px',
      minHeight: '150px',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'save') {
        const filtered = this.list.filter(
          (item) => item.username !== row.username
        );
        this.list = filtered;
        this.dataSource = new MatTableDataSource(filtered);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
}
