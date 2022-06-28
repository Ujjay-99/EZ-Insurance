import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { ICustomer } from 'src/app/models/ICustomer2';
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
  constructor(private adminService:AdminDataService,private router:Router,
              private agentService:AgentService) { }
  editCustomer(id: string) {
    console.log(id);
    this.router.navigate([`Admin/EditAgent/${id}`])    
  }

  deleteEmployee(id:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteEmployee(id).subscribe(response => {
          console.log(response);
        });
        this.ngOnInit();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  ngOnInit(): void {
    this.agentId = this.agentService.getAgentId();
    this.adminService.viewCustomersByAgentId(this.agentId).subscribe(customer=>{
      this.customerList=customer
    })
  }
}
