import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { IAdmin } from 'src/app/models/IAdmin';
import { ICustomer } from 'src/app/models/ICustomer2';
import { IUser } from 'src/app/models/IUser';
import { ICity } from '../../models/ICity';
import { IEmployee } from '../../models/IEmployee';
import { IInsuraceScheme } from '../../models/iinsurace-scheme';
import { IInsuracePlan } from '../../models/IInsurancePlan';
import { IInsuranceType } from '../../models/IInsuranceType';
import { IState } from '../../models/IState';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  constructor(private http:HttpClient) { }

  adminlogin(payload:any){
    return this.http.post(`http://localhost:5000/api/users/admin-login`, payload )
  }
  addCity(data:ICity){
    return this.http.post(`http://localhost:5000/api/Admin/city/addCity`, data )
  }
  addState(data:IState){
    console.log(data);
    
    return this.http.post(`http://localhost:5000/api/Admin/state/addState`, data )
  }
  addType(iTypeData:IInsuranceType){
    console.log(iTypeData);
    
    return this.http.post(`http://localhost:5000/api/Admin/InsuranceType/addType`, iTypeData )
  }
  addScheme(schemeData:IInsuraceScheme){
    console.log(schemeData);
    
    return this.http.post(`http://localhost:5000/api/Admin/InsuranceScheme/addScheme`, schemeData )
  }
  updateScheme(data:IInsuraceScheme){
    console.log(data);    
    return this.http.put(`http://localhost:5000/api/Admin/InsuranceScheme/update`, data )
  }
  addPlan(planData:IInsuracePlan){
    console.log(planData);
    
    return this.http.post(`http://localhost:5000/api/Admin/InsurancePlan/addPlan`, planData )
  }
  addEmployee(empData:IEmployee){
    return this.http.post(`http://localhost:5000/api/Users/addEmployee`, empData )
  }
  addAgent(empData:IEmployee){
    return this.http.post(`http://localhost:5000/api/Users/addAgent`, empData )
  }
  addCustomer(empData:ICustomer){
    return this.http.post(`http://localhost:5000/api/Users/addCustomer`, empData )
  }
  updateAdmin(empData:IAdmin){
    return this.http.put(`http://localhost:5000/api/Users/update-admin`, empData )
  }
  updateEmployee(empData:IEmployee){
    return this.http.put(`http://localhost:5000/api/Users/update-user`, empData )
  }
  updateAgent(empData:IEmployee){
    return this.http.put(`http://localhost:5000/api/Users/update-user`, empData )
  }
  updateCustomer(empData:IEmployee){
    return this.http.put(`http://localhost:5000/api/Users/update-user`, empData )
  }

  viewCity(){
    return this.http.get<ICity[]>(`http://localhost:5000/api/Admin/city/getCities`)
  }
  viewCityById(id:string){
    return this.http.get<IState[]>(`http://localhost:5000/api/Admin/city/getCity/${id}`)
  }
  updateCity(data:ICity){
    console.log(data);
    
    return this.http.put(`http://localhost:5000/api/Admin/city/update`, data )
  }
  viewState(){
    return this.http.get<IState[]>(`http://localhost:5000/api/Admin/state/getStates`)
  }
  viewStateById(id:string){
    return this.http.get<IState[]>(`http://localhost:5000/api/Admin/state/getState/${id}`)
  }
  updateState(data:IState){
    console.log(data);
    
    return this.http.put(`http://localhost:5000/api/Admin/state/update`, data )
  }
  viewType(){
    return this.http.get<IInsuranceType[]>(`http://localhost:5000/api/Admin/InsuranceType/getTypes`)
  }
  viewTypeById(id:string){
    return this.http.get<IInsuranceType>(`http://localhost:5000/api/Admin/InsuranceType/getType/${id}`)
  }
  viewScheme(){
    return this.http.get<IInsuraceScheme[]>(`http://localhost:5000/api/Admin/InsuranceScheme/getSchemes`)
  }
  viewSchemeById(id:string){
    return this.http.get<IInsuraceScheme>(`http://localhost:5000/api/Admin/InsuranceScheme/getScheme/${id}`)
  }
  viewPlans(){
    return this.http.get<IInsuracePlan[]>(`http://localhost:5000/api/Admin/InsurancePlan/getPlans`)
  }
  viewPlanBySchemeTitle(schemeTitle:string){
    return this.http.get<IInsuracePlan[]>(`http://localhost:5000/api/Admin/InsurancePlan/getPlans/${schemeTitle}`)
  }
  viewPlanById(id:string){
    return this.http.get<IInsuracePlan[]>(`http://localhost:5000/api/Admin/InsurancePlan/getPlan/${id}`)
  }
  updatePlan(data:IInsuracePlan){
    console.log(data);
    
    return this.http.put(`http://localhost:5000/api/Admin/InsurancePlan/update`, data )
  }
  viewSchemesByType(type:string){
    return this.http.get<IInsuraceScheme[]>(`http://localhost:5000/api/Admin/InsuranceScheme/getSchemes/${type}`)
  }
  viewAdmin(){
    return this.http.get<IAdmin[]>(`http://localhost:5000/api/Users/getUsersByRoles/Admin`)
  }
  viewEmployees(){
    return this.http.get<IEmployee[]>(`http://localhost:5000/api/Users/getUsersByRoles/Employee`)
  }
  viewAgents(){
    return this.http.get<IEmployee[]>(`http://localhost:5000/api/Users/getUsersByRoles/Agent`)
  }
  viewCustomers(){
    return this.http.get<ICustomer[]>(`http://localhost:5000/api/Users/getUsersByRoles/Customer`)
  }

  viewCustomersByAgentId(parentId:string){
    return this.http.get<ICustomer[]>(`http://localhost:5000/api/Users/getUsersByParentId/${parentId}`)
  }
  
  viewEmployeeById(id:string){
    return this.http.get<IEmployee[]>(`http://localhost:5000/api/Users/${id}`)
  }
  viewAgentById(id:string){
    return this.http.get<IEmployee[]>(`http://localhost:5000/api/Users/${id}`)
  }
  deleteEmployee(id:string){
    return this.http.delete(`http://localhost:5000/api/users/delete/${id}`)
  }

  deleteCity(id:string){
    return this.http.delete(`http://localhost:5000/api/Admin/city/${id}`)
  }
  deleteState(id:string){
    return this.http.delete(`http://localhost:5000/api/Admin/state/${id}`)
  }
  deleteType(id:string){
    return this.http.delete(`http://localhost:5000/api/Admin/InsuranceType/${id}`)
  }
  deleteScheme(id:string){
    return this.http.delete(`http://localhost:5000/api/Admin/InsuranceScheme/${id}`)
  }
  deletePlan(id:string){
    return this.http.delete(`http://localhost:5000/api/Admin/InsurancePlan/${id}`)
  }
  updateType(data:IInsuranceType){
    console.log(data);
    
    return this.http.put(`http://localhost:5000/api/Admin/InsuranceType/update`, data )
  }

  getUser(id:string){
    return this.http.get<IUser>(`http://localhost:5000/api/users/${id}`)
  }
}
