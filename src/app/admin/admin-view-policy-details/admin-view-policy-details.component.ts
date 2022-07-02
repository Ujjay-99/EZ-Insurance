import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/customer/customer.service';
import { ICustomer } from 'src/app/models/ICustomer';
import { IInsuranceAccount } from 'src/app/models/IInsuranceAccount';
import { IPayment } from 'src/app/models/IPayment';
import { IPolicy } from 'src/app/models/IPolicy';
import { AdminDataService } from '../admin-services/admin-data.service';

@Component({
  selector: 'app-admin-view-policy-details',
  templateUrl: './admin-view-policy-details.component.html',
  styleUrls: ['./admin-view-policy-details.component.css']
})
export class AdminViewPolicyDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private adminService: AdminDataService,

  ) {}
  id = '';
  accountDetail: IInsuranceAccount;
  customerDetail: ICustomer;
  policyDetail: IPolicy[];
  payments: IPayment[];
  installmentNumber: number;
  customerName: string;
  policyDate: Date;
  policy: IPolicy;

  policyId: string;

  createdAt: Date;
  installmentAmount: number;
  counter() {
    return new Array(this.installmentNumber - this.payments.length);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    this.policy = this.adminService.getPolicy();
    this.policyId = this.policy.id;
    this.installmentNumber=this.policy.installmentsCount
    this.installmentAmount=this.policy.installmentAmount
    this.policyDate=this.policy.createdAt

    this.adminService.getPaymentsByPolicyId(this.policyId).subscribe((x) => {
      this.success(x);
    });

  }
  
  customerId:string
  
  success(data: IPayment[]) {
    this.payments = data;
    this.customerId=this.adminService.getAccount().customerId
    this.customerService
      .getCustomerById(this.customerId)
      .subscribe((x) => {
        this.customerDetail = x;
      });
    //   let newDate: Date = new Date(this.policyDate);  
    // this.policyDate= new Date(newDate.setMonth(newDate.getMonth()+2)) ;
  }

  addMonthsToDate(_date: Date, _noOfMonths: number) {
    var yearFromDate = _date.getFullYear();
    var monthFromYear = _date.getMonth();
    var dayFromYear = _date.getDate();
    var newDate = new Date(
      yearFromDate,
      monthFromYear + _noOfMonths,
      dayFromYear
    );
    return newDate;
  }
  updateDate() {
    this.policyDate = new Date(this.policyDate);  
    this.policyDate = new Date(this.policyDate.setMonth(this.policyDate.getMonth()+5));  
    console.log('--------------------------------------');
    
  }
  
}
