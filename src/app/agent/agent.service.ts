import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http:HttpClient) { }
  agentId:string;

  agentLogin(payload:any){
    return this.http.post(`http://localhost:5000/api/users/agent-login`, payload )
  }
  
  getAgentId(){
    return this.agentId;
  }
  
  setAgentId(empId:string){
    this.agentId =  empId;
  }
}