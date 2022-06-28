import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { ICustomer } from 'src/app/models/ICustomer2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-view-customers',
  templateUrl: './employee-view-customers.component.html',
  styleUrls: ['./employee-view-customers.component.css']
})
export class EmployeeViewCustomersComponent implements OnInit {

  agentId:string;

  customerList:ICustomer[]=[]
  constructor(private adminService:AdminDataService,private router:Router,
              ) { }


  
  ngOnInit(): void {
 
    this.adminService.viewCustomers().subscribe(customer=>{
      this.customerList=customer
    })
  }
}
