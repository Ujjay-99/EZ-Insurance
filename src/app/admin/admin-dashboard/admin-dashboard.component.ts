import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../admin-services/admin-data.service';
import { IEmployee } from '../../models/IEmployee';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stateCount:number;
  cityCount:number;
  insurancePlanCount:number;
  insuranceSchemeCount:number;
  agentsCount:number;
  employeesCount:number;
  customersCount:number;
  policiesBoughtCount:number;
  employeeList:IEmployee[] = [];
  constructor(private adminService:AdminDataService) { }

  ngOnInit(): void {
    this.adminService.viewState().subscribe(response =>{
      this.stateCount = response.length;
    });
    this.adminService.viewCity().subscribe(response =>{
      this.cityCount = response.length;
    });
    this.adminService.viewPlans().subscribe(response =>{
      this.insurancePlanCount = response.length;
    });
    this.adminService.viewScheme().subscribe(response =>{
      this.insuranceSchemeCount = response.length;
    });
    this.adminService.viewAgents().subscribe(response =>{
      this.agentsCount = response.length;
    });
    this.adminService.viewEmployees().subscribe(response =>{
      this.employeesCount = response.length;
      this.employeeList = response;
    });
    this.adminService.viewCustomers().subscribe(response =>{
      this.customersCount = response.length;
    });
    this.adminService.getAllPolicies().subscribe(response =>{
      this.policiesBoughtCount = response.length;
    });
    // this.adminService.viewPolicies().subscribe(response =>{
    //   this.policiesBoughtCount = response.length;
    // });
  }

}
