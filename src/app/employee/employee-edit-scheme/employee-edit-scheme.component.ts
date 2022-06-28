import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IInsuraceScheme } from 'src/app/models/iinsurace-scheme';
import { IInsuranceType } from 'src/app/models/IInsuranceType';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-employee-edit-scheme',
  templateUrl: './employee-edit-scheme.component.html',
  styleUrls: ['./employee-edit-scheme.component.css']
})
export class EmployeeEditSchemeComponent implements OnInit {
  schemeForm: FormGroup;
  id: string;
  isAddMode: boolean; 
  
  submitted = false;

  typeList:IInsuranceType[]=[]
  constructor(private adminService: AdminDataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router:Router) { 
    this.adminService.viewType().subscribe(type=>{
      console.log(type);
      
      this.typeList=type
    })
    // console.log(this.typeList);    
    
  }
  get f() {
    return this.schemeForm.controls;
  }

  onSubmit() {
    console.log(this.isAddMode);
    this.submitted = true;

    
    if (this.isAddMode) {
      this.addScheme();
      Swal.fire('Scheme added successfully.');
    } else {
     this.updateScheme();
     Swal.fire('Scheme updated successfully.');
    }
  }
  addScheme(){
    // console.log(this.iType+this.iScheme+this.regCom+this.installCom +this.note+this.status);
    const schemeData:IInsuraceScheme={
    
      id:'',
      insuranceTypeTitle:this.schemeForm.controls['insuranceTypeTitle'].value,
      insuranceSchemeTitle:this.schemeForm.controls['insuranceSchemeTitle'].value,
      commissionNewRegistration:this.schemeForm.controls['commissionNewRegistration'].value,
      commissionPerInstallment:this.schemeForm.controls['commissionPerInstallment'].value,
      information:this.schemeForm.controls['information'].value,
      isActive:this.schemeForm.controls['isActive'].value,
      // createdAt:''
    }
    this.adminService
    .addScheme(schemeData)
    .pipe(first())
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
    Swal.fire('Scheme Added successfully.');
    
  }

  updateScheme(){
    const schemeData:IInsuraceScheme={    
      id:this.id,
      insuranceTypeTitle:this.schemeForm.controls['insuranceTypeTitle'].value,
      insuranceSchemeTitle:this.schemeForm.controls['insuranceSchemeTitle'].value,
      commissionNewRegistration:this.schemeForm.controls['commissionNewRegistration'].value,
      commissionPerInstallment:this.schemeForm.controls['commissionPerInstallment'].value,
      information:this.schemeForm.controls['information'].value,
      isActive:this.schemeForm.controls['isActive'].value,
      // createdAt:''

    }

    this.adminService.updateScheme(schemeData)
        .pipe(first())
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
            
          },
        });
        Swal.fire('Scheme Updated successfully.');
        this.router.navigate([`Employee/EmployeeDashboard`])
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.schemeForm = this.formBuilder.group({
      insuranceTypeTitle:['',Validators.required],
      insuranceSchemeTitle: ['', Validators.required],
      commissionNewRegistration: ['', Validators.required],
      commissionPerInstallment: ['', Validators.required],
      information: ['', Validators.required],
      isActive: [null, Validators.required]
    });
    if (!this.isAddMode) {
      this.adminService
        .viewSchemeById(this.id)
        .pipe(first())
        .subscribe((x) => this.schemeForm.patchValue(x));
    }
  }

}
