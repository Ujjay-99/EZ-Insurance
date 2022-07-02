import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/agent/agent.service';
import { IInsuranceAccount } from 'src/app/models/IInsuranceAccount';
import { AdminDataService } from '../admin-services/admin-data.service';

@Component({
  selector: 'app-admin-view-insurance-details',
  templateUrl: './admin-view-insurance-details.component.html',
  styleUrls: ['./admin-view-insurance-details.component.css']
})
export class AdminViewInsuranceDetailsComponent implements OnInit {

  accountsList:IInsuranceAccount[];

  constructor(private adminService:AdminDataService, private router: Router) { }

  viewPolicies(account:IInsuranceAccount){
    this.adminService.setAccount(account)
    console.log("Wanted 1: ", this.adminService.getAccount());
    
    this.router.navigate([`Admin/ViewPolicies`]);

  }
  ngOnInit(): void {
    this.adminService.viewAccounts().subscribe(x=>{
      this.accountsList=x;
    })
  
  }

}
