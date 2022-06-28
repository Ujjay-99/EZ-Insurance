import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IInsuraceScheme } from 'src/app/models/iinsurace-scheme';
import { IInsuracePlan } from 'src/app/models/IInsurancePlan';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css']
})
export class PlanDetailsComponent implements OnInit {
  schemeTitle: string;
  form:FormGroup
  PlanName:string;
  scheme:IInsuraceScheme;
  formBuilder: any;
  plandetail:IInsuracePlan

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


  constructor(private adminService: AdminDataService,private route: ActivatedRoute,private router: Router) { }
  goToAgentLogin(){
    this.router.navigate([`AgentLogin`])
  }
  goToLogin(){
    this.router.navigate([`CustomerLogin`])

  }

  calculate(){
    
    this.installAmount=this.investAmount/this.months
    this.interestAmount=this.investAmount*this.years*(this.ratio/100)
    this.totalAmount=+this.investAmount + +this.interestAmount


    console.log(this.installAmount);
  }

  ngOnInit(): void {
    this.schemeTitle = this.route.snapshot.params['id'];
    console.log(this.schemeTitle);
    
    // this.form = this.formBuilder.group({
     
    //   policyTermMin: [null, Validators.required],
    //   policyTermMax: ['', Validators.required],
    //   ageMin: ['', Validators.required],
    //   ageMax: ['', Validators.required],
    //   investmentMin: ['', Validators.required],
    //   investmentMax: ['', Validators.required],
    //   profitRatio: ['', Validators.required],

    //   years: ['', Validators.required],
    //   amount: ['', Validators.required],
    //   months: ['', Validators.required],

      
    // });
    
    this.adminService
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

  // success(data:IInsuracePlan[]){
  //   console.log(data);
    
  // }

}
