import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { ICustomer } from 'src/app/models/ICustomer2';
import { IInsuranceAccount } from 'src/app/models/IInsuranceAccount';
import { IMakePayment } from 'src/app/models/IMakePayment';
import { IPayment } from 'src/app/models/IPayment';
import { IPolicy } from 'src/app/models/IPolicy';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-agent-view-policy-detail',
  templateUrl: './agent-view-policy-detail.component.html',
  styleUrls: ['./agent-view-policy-detail.component.css']
})
export class AgentViewPolicyDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private agentService: AgentService,

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
    
    this.policy = this.agentService.getPolicy();
    this.policyId = this.policy.id;
    this.installmentNumber=this.policy.installmentsCount
    this.installmentAmount=this.policy.installmentAmount
    this.policyDate=this.policy.createdAt

    this.agentService.getPaymentsByPolicyId(this.policyId).subscribe((x) => {
      this.success(x);
    });

   
  }
  
  customerId:string
  
  success(data: IPayment[]) {
    this.payments = data;
    this.customerId=this.agentService.getAccount().customerId
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
    let newDate: Date = new Date(this.policyDate);  
    this.policyDate= new Date(newDate.setMonth(newDate.getMonth()+5));  
    console.log('asdasd');
    
  }
  
}