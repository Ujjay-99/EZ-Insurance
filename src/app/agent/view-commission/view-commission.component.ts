import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IAgent } from 'src/app/models/IAgent';
import { ICommission } from 'src/app/models/ICommission';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-view-commission',
  templateUrl: './view-commission.component.html',
  styleUrls: ['./view-commission.component.css']
})
export class ViewCommissionComponent implements OnInit {

  constructor( private agentService:AgentService, private adminService:AdminDataService) { }
  commissions:ICommission[];
  agentId:string;
  agent:IAgent;

  ngOnInit(): void {
    this.agentId = this.agentService.getAgentId();
    console.log(this.agentId);
    this.agentService.viewAgentById(this.agentId)
              .subscribe(a => {
              this.agent = a;
              this.agentService.getCommissionsByAgentId(this.agentId)
                      .subscribe(x =>{
                      this.success(x);
                    })
              })
    
    
  }
  success(data:ICommission[]){
    this.commissions = data;
    console.log(data);  
  }
}
