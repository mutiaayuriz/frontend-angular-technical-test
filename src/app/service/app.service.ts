import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './interface/list.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'http://localhost:3000'
  constructor() { }

  // getEmployeeList(): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(`${this.url}/employee`);
  // }

}
