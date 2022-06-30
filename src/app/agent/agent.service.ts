import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAgent } from '../models/IAgent';
import { ICity } from '../models/ICity';

import { ICommission } from '../models/ICommission';
import { ICustomer } from '../models/ICustomer';
import { IDocument } from '../models/IDocument';
import { IEmployee } from '../models/IEmployee';
import { IInsuranceAccount } from '../models/IInsuranceAccount';
import { IPayment } from '../models/IPayment';
import { IPolicy } from '../models/IPolicy';
import { IState } from '../models/IState';
import { IWithdrawAccount } from '../models/IwithdrawAccount';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http:HttpClient) { }
  agentId:string;
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
  agentLogin(payload:any){
    return this.http.post(`http://localhost:5000/api/users/agent-login`, payload )
  }
  
  getCommissionsByAgentId(id:string){
    return this.http.get<ICommission[]>(`http://localhost:5000/api/Agent/getCommissionByAgentId/${id}`)
  }
  getAgentId(){
    return this.agentId;
  }
  
  setAgentId(empId:string){
    this.agentId =  empId;
  }
  getWithdrawAccountByAgentId(id:string){
    return this.http.get<IWithdrawAccount>(`http://localhost:5000/api/Agent/getWithdrawAccountByAgentId/${id}`)
  }
  withdrawAmount(payload:IWithdrawAccount){
    return this.http.put(`http://localhost:5000/api/Agent/withdrawAmount`,payload)
  }
  viewAccountsByAgentId(id:string){
    return this.http.get<IInsuranceAccount[]>(`http://localhost:5000/api/Customers/getAccountsByAgentId/${id}`)
  }
  account:IInsuranceAccount
  setAccount(account:IInsuranceAccount){
    this.account=account
  }
  getAccount(){
    return this.account
  }
  policy:IPolicy
  setPolicy(policy:IPolicy){
    this.policy=policy
  }
  getPolicy(){
    return this.policy
  }
  getPaymentsByPolicyId(id:string){
    console.log(id);    
    return this.http.get<IPayment[]>(`http://localhost:5000/api/Customers/getPaymentsByPolicyId/${id}` )
  }
  viewState(){
    return this.http.get<IState[]>(`http://localhost:5000/api/Admin/state/getStates`)
  }
  viewCity(){
    return this.http.get<ICity[]>(`http://localhost:5000/api/Admin/city/getCities`)
  }
  addCustomer(empData:ICustomer){
    return this.http.post(`http://localhost:5000/api/Users/addCustomer`, empData )
  }
  viewAgentById(id:string){
    return this.http.get<IAgent>(`http://localhost:5000/api/Users/${id}`)
  }
  updateAgent(empData:IEmployee){
    return this.http.put(`http://localhost:5000/api/Users/update-user`, empData )
  }
  viewCustomersByAgentId(parentId:string){
    return this.http.get<ICustomer[]>(`http://localhost:5000/api/Users/getUsersByParentId/${parentId}`)
  }

}