import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPolicy } from 'src/app/models/IPolicy';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-agent-view-policies',
  templateUrl: './agent-view-policies.component.html',
  styleUrls: ['./agent-view-policies.component.css']
})
export class AgentViewPoliciesComponent implements OnInit {
policiesList:IPolicy[]=[]
  constructor(private agentService:AgentService, private router: Router) { }

  ngOnInit(): void {

    this.policiesList= this.agentService.getAccount().policies

  }
  viewPolicy(policy:IPolicy) {
    this.agentService.setPolicy(policy)
    this.router.navigate([`Agent/ViewPolicyDetail`]);
  }

}
