import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IInsuranceType } from 'src/app/models/IInsuranceType';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-employee-edit-type',
  templateUrl: './employee-edit-type.component.html',
  styleUrls: ['./employee-edit-type.component.css']
})
export class EmployeeEditTypeComponent implements OnInit {
  typeForm: FormGroup;
  id: string;
  isAddMode: boolean;
  submitted = false;
  constructor(
    private adminService: AdminDataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private empService:EmployeeService
  ) {}
  get f() {
    return this.typeForm.controls;
  }

  onSubmit() {
    console.log(this.isAddMode);
    this.submitted = true;
    if (this.isAddMode) {
      return
    } else {
      this.editType();
      Swal.fire('Type Updated successfully.');
    }
  }

  

  private editType() {
    const typeData: IInsuranceType = {
      id: this.id,
      typeTitle: this.typeForm.controls['typeTitle'].value,
      isActive: this.typeForm.controls['status'].value,
    };
    this.empService.updateType(typeData)
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
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.typeForm = this.formBuilder.group({
      typeTitle: ['', Validators.required],
      status: [null, Validators.required],
    });
    if (!this.isAddMode) {
      this.empService
        .viewTypeById(this.id)
        .pipe(first())
        .subscribe((x) => this.typeForm.patchValue(x));
    }
  }

}
