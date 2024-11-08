import { Injectable } from '@angular/core';

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
