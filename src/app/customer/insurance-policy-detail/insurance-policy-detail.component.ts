import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { ICustomer } from 'src/app/models/ICustomer2';
import { IInsuranceAccount } from 'src/app/models/IInsuranceAccount';
import { IMakePayment } from 'src/app/models/IMakePayment';
import { IPayment } from 'src/app/models/IPayment';
import { IPolicy } from 'src/app/models/IPolicy';
import { IUser } from 'src/app/models/IUser';
import Swal from 'sweetalert2';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-insurance-policy-detail',
  templateUrl: './insurance-policy-detail.component.html',
  styleUrls: ['./insurance-policy-detail.component.css'],
})
export class InsurancePolicyDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private adminService: AdminDataService
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

    this.customerService.getPolicyById(this.id).subscribe((x) => {
      this.success(x);
    });
  }
  success(data: IPolicy) {
    this.policy = data;
    this.policyId = this.policy.id;
    this.installmentNumber=this.policy.installmentsCount
    this.installmentAmount=this.policy.installmentAmount
    this.policyDate=this.policy.createdAt

    this.customerService.getPaymentsByPolicyId(this.policyId).subscribe((x) => {
      this.success2(x);
    });
  }
  success2(data: IPayment[]) {
    this.payments = data;
    this.customerService
      .getCustomerById(this.customerService.getCustomerId())
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
    let newDate: Date = new Date(this.policyDate);  
    this.policyDate= new Date(newDate.setMonth(newDate.getMonth()+5));  
    console.log('asdasd');
    
  }
  makePaymnet(){
    const payload:IMakePayment={
      customerId:this.customerService.getCustomerId(),
      policyId:this.policy.id,
      amount:this.installmentAmount,
      insuranceSchemeTitle:this.policy.insuranceSchemeTitle
    }
    this.customerService.addPayment(payload).subscribe(x=>{
      console.log(x);
      
    })
    Swal.fire('Premium Paid Successfully.');
    this.ngOnInit();
  }
}
