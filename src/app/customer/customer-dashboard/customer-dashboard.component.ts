import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  constructor(private router:Router, private customerService:CustomerService) { }
  customerId:string;
  ngOnInit(): void {
  }

  editCustomer(){
    this.customerId = this.customerService.getCustomerId();
    this.router.navigate([`Customer/EditCustomer/${this.customerId}`])    
  }
}
