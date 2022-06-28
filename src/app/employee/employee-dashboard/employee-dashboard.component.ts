import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IEmployee } from 'src/app/models/IEmployee';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  stateCount:number;
  cityCount:number;
  insurancePlanCount:number;
  insuranceSchemeCount:number;
  agentsCount:number;
  employeesCount:number;
  policiesBoughtCount:number;
  agentList:IEmployee[] = [];
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
      this.agentList = response;
    });
    // this.adminService.viewPolicies().subscribe(response =>{
    //   this.policiesBoughtCount = response.length;
    // });
  }

}
