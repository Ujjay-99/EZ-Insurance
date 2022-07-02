import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/agent/agent.service';
import { IPolicy } from 'src/app/models/IPolicy';
import { AdminDataService } from '../admin-services/admin-data.service';

@Component({
  selector: 'app-admin-view-policies',
  templateUrl: './admin-view-policies.component.html',
  styleUrls: ['./admin-view-policies.component.css']
})
export class AdminViewPoliciesComponent implements OnInit {

  policiesList:IPolicy[]=[]
  constructor(private adminService:AdminDataService, private router: Router) { }

  ngOnInit(): void {

    this.policiesList= this.adminService.getAccount().policies;
    console.log("Wanted 2: ", this.adminService.getAccount());
    console.log(this.policiesList);
    
  }
  viewPolicy(policy:IPolicy) {
    this.adminService.setPolicy(policy)
    this.router.navigate([`Admin/ViewPolicyDetails`]);
  }

}
