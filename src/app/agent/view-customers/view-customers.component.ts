import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { ICustomer } from 'src/app/models/ICustomer';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {

  agentId:string;

  customerList:ICustomer[]=[]
  constructor(private router:Router,
              private agentService:AgentService) { }
  editCustomer(id: string) {
    console.log(id);
    this.router.navigate([`Admin/EditAgent/${id}`])    
  }

  
  ngOnInit(): void {
    this.agentId = this.agentService.getAgentId();
    this.agentService.viewCustomersByAgentId(this.agentId).subscribe(customer=>{
      this.customerList=customer
    })
  }

  viewDocuments(customer:ICustomer){
    this.agentService.setCustomer(customer);
    this.router.navigate([`Agent/ViewDocuments`]);
  }
}
