import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IInsuranceAccount } from 'src/app/models/IInsuranceAccount';
import { IPolicy } from 'src/app/models/IPolicy';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.css']
})
export class InsuranceDetailsComponent implements OnInit {
agentId:string
accountsList:IInsuranceAccount[]=[]

  constructor(private agentService:AgentService, private router: Router) { }

  viewPolicies(account:IInsuranceAccount){
    this.agentService.setAccount(account)
    this.router.navigate([`Agent/ViewPolicies`]);

  }
  ngOnInit(): void {
    this.agentId = this.agentService.getAgentId();
    console.log(this.agentId);
    
    this.agentService.viewAccountsByAgentId(this.agentId).subscribe(x=>{
      this.accountsList=x
      
      
      console.log(x);
      
    })
  
  }

}
