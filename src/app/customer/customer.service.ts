import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { IAddPolicy } from '../models/IAddPolicy';
import { IAddQuery } from '../models/IAddQuery';
import { ICustomer } from '../models/ICustomer2';
import { IInsuranceAccount } from '../models/IInsuranceAccount';
import { IMakePayment } from '../models/IMakePayment';
import { IPayment } from '../models/IPayment';
import { IPolicy } from '../models/IPolicy';
import { IQuery } from '../models/IQuery';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerId:string;

  constructor(private http:HttpClient) { }

  customerLogin(payload:any){
    return this.http.post(`http://localhost:5000/api/users/customer-login`, payload )
  }
  addQuery(payload:IAddQuery){
    return this.http.post(`http://localhost:5000/api/Customers/addQuery`,payload)
  }

  getPaymentsByPolicyId(id:string){
    console.log(id);    
    return this.http.get<IPayment[]>(`http://localhost:5000/api/Customers/getPaymentsByPolicyId/${id}` )
  }

  getPolicyById(id:string){
    return this.http.get<IPolicy>(`http://localhost:5000/api/Customers/getPolicy/${id}` )
  }
  getAccountById(id:string){
    return this.http.get<IInsuranceAccount>(`http://localhost:5000/api/Customers/getAccount/${id}`)
  }

  getAccountByCustomerId(id:string): Observable<IInsuranceAccount>{

    return this.http.get<IInsuranceAccount>(`http://localhost:5000/api/Customers/getAccountByCustomerId/${id}`)
  }


  policyPurchase(payload:IAddPolicy){
    return this.http.post(`http://localhost:5000/api/Customers/addPolicy`, payload )

  }
  getCustomerId(){
    return this.customerId;
  }
  getCustomerById(id:string){
    return this.http.get<ICustomer>(`http://localhost:5000/api/users/${id}`)
  }
  
  setCustomerId(empId:string){
    this.customerId =  empId;
  }

  addPayment(payload:IMakePayment){
    return this.http.post(`http://localhost:5000/api/Customers/addPayment`,payload);
  }
  viewQueriesByCustomerId(id:string){
    return this.http.get<IQuery[]>(`http://localhost:5000/api/Customers/Query/getQueryByCustomerId/${id}`)
  }
}
