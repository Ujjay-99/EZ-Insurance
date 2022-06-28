import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { IInsuranceAccount } from 'src/app/models/IInsuranceAccount';
import { IPolicy } from 'src/app/models/IPolicy';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-insurance-details',
  templateUrl: './customer-insurance-details.component.html',
  styleUrls: ['./customer-insurance-details.component.css'],
})
export class CustomerInsuranceDetailsComponent implements OnInit {
  customerId: string;
  account: IInsuranceAccount;
  policies: IPolicy[];
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = this.customerService.getCustomerId();
    this.customerService
      .getAccountByCustomerId(this.customerId)
      .pipe(first())
      .subscribe((response) => {
        this.success(response);
      });
  }
  success(data: IInsuranceAccount) {
    this.account = data;
    this.policies = this.account.policies;
  }

  viewPolicy(id:string) {
    this.router.navigate([`Customer/InsurancePolicyDetail/${id}`]);
  }
}
