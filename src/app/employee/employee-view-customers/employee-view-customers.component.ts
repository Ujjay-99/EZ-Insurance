import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { ICustomer } from 'src/app/models/ICustomer';
import Swal from 'sweetalert2';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-view-customers',
  templateUrl: './employee-view-customers.component.html',
  styleUrls: ['./employee-view-customers.component.css']
})
export class EmployeeViewCustomersComponent implements OnInit {

  agentId:string;

  customerList:ICustomer[]=[]
  constructor(private adminService:AdminDataService,private router:Router, private employeeService:EmployeeService) { }


  
  ngOnInit(): void {
 
    this.employeeService.viewCustomers().subscribe(customer=>{
      this.customerList=customer
    })
  }

  viewDocuments(customer:ICustomer){
    this.employeeService.setCustomer(customer);
    this.router.navigate([`Employee/ViewDocuments`]);
  }
}
