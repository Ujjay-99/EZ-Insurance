import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IPayment } from 'src/app/models/IPayment';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-view-payments',
  templateUrl: './employee-view-payments.component.html',
  styleUrls: ['./employee-view-payments.component.css']
})
export class EmployeeViewPaymentsComponent implements OnInit {
 
  paymentsList:IPayment[]=[]
  
    constructor(private adminService:AdminDataService,private empService:EmployeeService) { }
  
    ngOnInit(): void {
      this.empService.viewPayments().subscribe(payments=>{
        console.log(payments);
        this.paymentsList=payments
        
      })
      
    }
  
  }
  