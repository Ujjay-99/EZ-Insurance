import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICity } from '../models/ICity';
import { ICustomer } from '../models/ICustomer';
import { IDocument } from '../models/IDocument';
import { IEmployee } from '../models/IEmployee';
import { IInsuraceScheme } from '../models/iinsurace-scheme';
import { IInsuracePlan } from '../models/IInsurancePlan';
import { IInsuranceType } from '../models/IInsuranceType';
import { IPayment } from '../models/IPayment';
import { IQuery } from '../models/IQuery';
import { IState } from '../models/IState';

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
    return this.http.get<IDocument[]>(`http://localhost:5000/api/employee/getImagesByBaseId/${id}` )
  }
  deleteDocument(id:string){
    return this.http.delete(`http://localhost:5000/api/employee/deleteDocument/${id}` )
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

  //newly added

  updateEmployee(empData:IEmployee){
    return this.http.put(`http://localhost:5000/api/Users/update-user`, empData )
  }
  viewEmployeeById(id:string){
    return this.http.get<IEmployee[]>(`http://localhost:5000/api/Users/${id}`)
  }
  addAgent(empData:IEmployee){
    return this.http.post(`http://localhost:5000/api/Users/addAgent`, empData )
  }
  updateAgent(empData:IEmployee){
    return this.http.put(`http://localhost:5000/api/Users/update-user`, empData )
  }
  viewState(){
    return this.http.get<IState[]>(`http://localhost:5000/api/employee/state/getStates`)
  }
  viewCity(){
    return this.http.get<ICity[]>(`http://localhost:5000/api/employee/city/getCities`)
  }
  viewPlans(){
    return this.http.get<IInsuracePlan[]>(`http://localhost:5000/api/employee/InsurancePlan/getPlans`)
  }
  viewScheme(){
    return this.http.get<IInsuraceScheme[]>(`http://localhost:5000/api/employee/InsuranceScheme/getMainSchemes`)
  }
  viewAgents(){
    return this.http.get<IEmployee[]>(`http://localhost:5000/api/Users/getUsersByRoles/Agent`)
  }
  addCity(data:ICity){
    return this.http.post(`http://localhost:5000/api/employee/city/addCity`, data )
  }
  updateCity(data:ICity){
    console.log(data);
    
    return this.http.put(`http://localhost:5000/api/employee/city/update`, data )
  }
  viewCityById(id:string){
    return this.http.get<IState[]>(`http://localhost:5000/api/employee/city/getCity/${id}`)
  }
  viewSchemesByType(type:string){
    return this.http.get<IInsuraceScheme[]>(`http://localhost:5000/api/employee/InsuranceScheme/getSchemes/${type}`)
  }
  addPlan(planData:IInsuracePlan){
    console.log(planData);
    
    return this.http.post(`http://localhost:5000/api/employee/InsurancePlan/addPlan`, planData )
  }
  updatePlan(data:IInsuracePlan){
    console.log(data);
    
    return this.http.put(`http://localhost:5000/api/employee/InsurancePlan/update`, data )
  }
  viewType(){
    return this.http.get<IInsuranceType[]>(`http://localhost:5000/api/employee/InsuranceType/getTypes`)
  }
  viewPlanById(id:string){
    return this.http.get<IInsuracePlan[]>(`http://localhost:5000/api/employee/InsurancePlan/getPlan/${id}`)
  }
  addScheme(schemeData:IInsuraceScheme){
    console.log(schemeData);
    
    return this.http.post(`http://localhost:5000/api/employee/InsuranceScheme/addScheme`, schemeData )
  }
  updateScheme(data:IInsuraceScheme){
    console.log(data);    
    return this.http.put(`http://localhost:5000/api/employee/InsuranceScheme/update`, data )
  }
  viewSchemeById(id:string){
    return this.http.get<IInsuraceScheme>(`http://localhost:5000/api/employee/InsuranceScheme/getScheme/${id}`)
  }
  addState(data:IState){
    console.log(data);
    
    return this.http.post(`http://localhost:5000/api/employee/state/addState`, data )
  }
  updateState(data:IState){
    console.log(data);
    
    return this.http.put(`http://localhost:5000/api/employee/state/update`, data )
  }
  viewStateById(id:string){
    return this.http.get<IState[]>(`http://localhost:5000/api/employee/state/getState/${id}`)
  }
  updateType(data:IInsuranceType){
    console.log(data);
    
    return this.http.put(`http://localhost:5000/api/employee/InsuranceType/update`, data )
  }
  viewTypeById(id:string){
    return this.http.get<IInsuranceType>(`http://localhost:5000/api/employee/InsuranceType/getType/${id}`)
  }
  deleteEmployee(id:string){
    return this.http.delete(`http://localhost:5000/api/users/delete/${id}`)
  }
  deleteCity(id:string){
    return this.http.delete(`http://localhost:5000/api/Admin/city/${id}`)
  }
  viewCustomers(){
    return this.http.get<ICustomer[]>(`http://localhost:5000/api/Users/getUsersByRoles/Customer`)
  }
  viewPayments(){
    return this.http.get<IPayment[]>(`http://localhost:5000/api/employee/getPayments`);
  }
  deletePlan(id:string){
    return this.http.delete(`http://localhost:5000/api/employee/InsurancePlan/${id}`)
  }
  reply(payload:IQuery){
    return this.http.put(`http://localhost:5000/api/employee/Query/replyToQuery`,payload)
  }
  viewQueries(){
    return this.http.get<IQuery[]> (`http://localhost:5000/api/employee/Query/getQueries`)
  }
  deleteScheme(id:string){
    return this.http.delete(`http://localhost:5000/api/employee/InsuranceScheme/${id}`)
  }
  deleteState(id:string){
    return this.http.delete(`http://localhost:5000/api/employee/state/${id}`)
  }
  deleteType(id:string){
    return this.http.delete(`http://localhost:5000/api/employee/InsuranceType/${id}`)
  }
  
  
}