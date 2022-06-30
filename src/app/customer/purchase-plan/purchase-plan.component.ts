import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IAddPolicy } from 'src/app/models/IAddPolicy';
import { IInsuraceScheme } from 'src/app/models/iinsurace-scheme';
import { IInsuracePlan } from 'src/app/models/IInsurancePlan';
import Swal from 'sweetalert2';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-purchase-plan',
  templateUrl: './purchase-plan.component.html',
  styleUrls: ['./purchase-plan.component.css']
})
export class PurchasePlanComponent implements OnInit {
  schemeTitle: string;
  form:FormGroup
  PlanName:string;
  scheme:IInsuraceScheme;
  formBuilder: any;
  plandetail:IInsuracePlan
  isDisabled = true;

  insuranceTypeTitle:string
  insuranceSchemeTitle:string
  minTerm:number
  maxTerm:number
  minAge:number
  maxAge:number
  investMin:number
  investMax:number
  ratio:number



  years:number
  investAmount:number
  months:number

  installAmount:number
  interestAmount:number
  totalAmount:number


  constructor(private adminService: AdminDataService,private route: ActivatedRoute,private router: Router,private customerService:CustomerService) { }
 

  calculate(){
    this.installAmount=this.investAmount/this.months
    this.interestAmount=this.investAmount*this.years*(this.ratio/100)
    this.totalAmount=+this.investAmount + +this.interestAmount
    this.isDisabled = false;


    console.log(this.installAmount);
  }

  proceed(){  
      const payload: IAddPolicy= {
       
          customerId: this.customerService.getCustomerId(),
          insuranceTypeTitle: this.insuranceTypeTitle,
          policyTerm: this.years,
          insuranceSchemeTitle: this.insuranceSchemeTitle,
          totalPremiumAmount: this.investAmount,
          installmentAmount: this.installAmount,
          installmentCount: this.months,
          sumAssured:this.totalAmount
      
      }
      console.log(payload);
      
      

      Swal.fire({
        title: 'Are you sure?',
        text: "Do You Purchase This policy?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Purchase',
        preConfirm:(login)=>{
          this.customerService.policyPurchase(payload).subscribe(x=>{
            console.log(x);
            
          })
        }
        
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Purchased',
            'Go to Insurance Details to View the Policy',
            'success'
          )
        }
        this.router.navigate([`Customer/CustomerDashboard`])
      })

      // this.router.navigate([`Customer/ConfirmPlan`])
  }

  ngOnInit(): void {
    this.schemeTitle = this.route.snapshot.params['schemeName'];
    console.log(this.schemeTitle);
    

    this.customerService
        .viewPlanBySchemeTitle(this.schemeTitle)
        .subscribe(x => {
          this.insuranceSchemeTitle=x[0].insuranceSchemeTitle;
          this.insuranceTypeTitle=x[0].insuranceTypeTitle;

          this.minTerm=x[0].policyTermMin;
          this.maxTerm=x[0].policyTermMax;
          this.minAge=x[0].ageMin;
          this.maxAge=x[0].ageMax;
          this.investMin=x[0].investmentMin;
          this.investMax=x[0].investmentMax;
          this.ratio=x[0].profitRatio;

          console.log(x);  
        });    
  }

}
