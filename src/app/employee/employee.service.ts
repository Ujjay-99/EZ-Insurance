import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomer } from '../models/ICustomer';
import { IDocument } from '../models/IDocument';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  employeeId:string;

  customer:ICustomer;
  setCustomer(customer:ICustomer){
    this.customer = customer;
  }
  getCustomer(){
    return this.customer;
  }
  getDocumentsByCustomerId(id:string){
    return this.http.get<IDocument[]>(`http://localhost:5000/api/admin/image/getImagesByBaseId/${id}` )
  }
  deleteDocument(id:string){
    return this.http.delete(`http://localhost:5000/api/admin/image/deleteDocument/${id}` )
  }
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
