import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/models/ICustomer2';
import { IPayment } from 'src/app/models/IPayment';
import { AdminDataService } from '../admin-services/admin-data.service';

@Component({
  selector: 'app-admin-view-payments',
  templateUrl: './admin-view-payments.component.html',
  styleUrls: ['./admin-view-payments.component.css']
})
export class AdminViewPaymentsComponent implements OnInit {
 
paymentsList:IPayment[]=[]

  constructor(private adminService:AdminDataService) { }

  ngOnInit(): void {
    this.adminService.viewPayments().subscribe(payments=>{
      console.log(payments);
      this.paymentsList=payments
      
    })
    
  }

}
