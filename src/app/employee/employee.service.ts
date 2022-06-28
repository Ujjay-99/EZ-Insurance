import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  employeeId:string;

  employeeLogin(payload:any){
    return this.http.post(`http://localhost:5000/api/users/employee-login`, payload )
  }

  getEmployeeId(){
    return this.employeeId;
  }
  
  setEmployeeId(empId:string){
    this.employeeId =  empId;
  }
  
}
