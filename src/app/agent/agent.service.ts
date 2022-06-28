import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICommission } from '../models/ICommission';
import { IWithdrawAccount } from '../models/IwithdrawAccount';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http:HttpClient) { }
  agentId:string;

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
}