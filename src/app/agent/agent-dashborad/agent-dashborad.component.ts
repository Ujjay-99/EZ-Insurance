import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-agent-dashborad',
  templateUrl: './agent-dashborad.component.html',
  styleUrls: ['./agent-dashborad.component.css']
})
export class AgentDashboradComponent implements OnInit {
  customerCount:number
  constructor(private agentService:AgentService) { }

  ngOnInit(): void {
    this.agentService.viewCustomersByAgentId(this.agentService.getAgentId()).subscribe(customer=>{
      this.customerCount=customer.length
    })
  }

}
