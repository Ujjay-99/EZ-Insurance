import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IInsuraceScheme } from 'src/app/models/iinsurace-scheme';
import { IInsuranceType } from 'src/app/models/IInsuranceType';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { IInsuracePlan } from 'src/app/models/IInsurancePlan';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-edit-plan',
  templateUrl: './employee-edit-plan.component.html',
  styleUrls: ['./employee-edit-plan.component.css']
})
export class EmployeeEditPlanComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean; 
  submitted = false;


  selectedPlan = '';
  typeList:IInsuranceType[]=[]
  schemeList:IInsuraceScheme[]=[]

  constructor(
    private adminService:AdminDataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empService:EmployeeService) { }
  onSubmit() {
    console.log(this.isAddMode);
    this.submitted = true;

    
    if (this.isAddMode) {
      this.addPlan();
      Swal.fire('Plan added successfully.');
    } else {
     this.editPlan();
     Swal.fire('Plan Updated successfully.');
    }
  }

  onSelected(value:string){
    this.selectedPlan=value
    this.empService.viewSchemesByType(this.selectedPlan).subscribe(schemes=>{
      console.log(schemes);      
      this.schemeList=schemes
    })
    // console.log(this.selectedPlan);
    
  }
  addPlan(){
    // console.log(this.iType+this.iScheme+this.regCom+this.installCom +this.note+this.status);
    const planData:IInsuracePlan={
      id:'',
      insuranceTypeTitle:this.form.controls['insuranceTypeTitle'].value,
      insuranceSchemeTitle:this.form.controls['insuranceSchemeTitle'].value,
      policyTermMin:this.form.controls['policyTermMin'].value,
      policyTermMax:this.form.controls['policyTermMax'].value,
      ageMin:this.form.controls['ageMin'].value,
      ageMax:this.form.controls['ageMax'].value,
      investmentMin:this.form.controls['investmentMin'].value,
      investmentMax:this.form.controls['investmentMax'].value,
      profitRatio:this.form.controls['profitRatio'].value,
      isActive:this.form.controls['status'].value,
    }
    this.empService
    .addPlan(planData)
    .pipe(first())
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
    Swal.fire('Plan Added successfully.');
  }

  editPlan(){
    const planData:IInsuracePlan={
      id:this.id,
      insuranceTypeTitle:this.form.controls['insuranceTypeTitle'].value,
      insuranceSchemeTitle:this.form.controls['insuranceSchemeTitle'].value,
      policyTermMin:this.form.controls['policyTermMin'].value,
      policyTermMax:this.form.controls['policyTermMax'].value,
      ageMin:this.form.controls['ageMin'].value,
      ageMax:this.form.controls['ageMax'].value,
      investmentMin:this.form.controls['investmentMin'].value,
      investmentMax:this.form.controls['investmentMax'].value,
      profitRatio:this.form.controls['profitRatio'].value,
      isActive:this.form.controls['status'].value,
    }

    this.empService.updatePlan(planData)
        .pipe(first())
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
            
          },
        });
  }

  ngOnInit(): void {
    
    this.empService.viewType().subscribe(type=>{
      console.log(type);
      
      this.typeList=type
    })
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.form = this.formBuilder.group({
      insuranceTypeTitle:['',Validators.required],
      insuranceSchemeTitle: ['', Validators.required],
      policyTermMin: [null, Validators.required],
      policyTermMax: ['', Validators.required],
      ageMin: ['', Validators.required],
      ageMax: ['', Validators.required],
      investmentMin: ['', Validators.required],
      investmentMax: ['', Validators.required],
      profitRatio: ['', Validators.required],
      status: [null, Validators.required]
    });
    if (!this.isAddMode) {
      this.empService
        .viewPlanById(this.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }

}
