import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  NgModule,
} from '@angular/core';

// import { BrowserModule } from "@angular/platform-browser";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppService } from '../service/app.service';
import { Employee } from '../service/interface/list.interface';
import { MaterialModule } from '../material.module';
import * as dataEmployee from '../../../db.json';
import {
  CurrencyPipe,
  DatePipe,
  TitleCasePipe,
  DecimalPipe,
} from '@angular/common';
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
    DecimalPipe,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, AfterViewInit {
  constructor(private appService: AppService, private router: Router) {}
  public type: string = 'list';

  list: Employee[] = dataEmployee.employee;
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
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource(this.list);
  dataSelected: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {
  }

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
    if (filterValue.length > 1 || filterValue === '') {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    if (filterValue.length > 1) {
      // this.local.setItem('keyword', filterValue);
    } else if (filterValue === '') {
      // this.local.clear();
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
  }

  deleteEmployee(row: Employee) {
  }
}
