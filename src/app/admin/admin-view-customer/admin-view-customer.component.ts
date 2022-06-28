import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer } from 'src/app/models/ICustomer2';
import { AdminDataService } from '../admin-services/admin-data.service';

@Component({
  selector: 'app-admin-view-customer',
  templateUrl: './admin-view-customer.component.html',
  styleUrls: ['./admin-view-customer.component.css']
})
export class AdminViewCustomerComponent implements OnInit {

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


