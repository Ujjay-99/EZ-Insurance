import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from '../admin-services/admin-data.service';
import { IInsuranceType } from '../../models/IInsuranceType';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css'],
})
export class AddTypeComponent implements OnInit {
  typeForm: FormGroup;
  id: string;
  isAddMode: boolean;
  submitted = false;
  constructor(
    private adminService: AdminDataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  get f() {
    return this.typeForm.controls;
  }

  onSubmit() {
    console.log(this.isAddMode);
    this.submitted = true;
    if (this.isAddMode) {
      this.addType();
      Swal.fire('Type Added successfully.');
    } else {
      this.editType();
      Swal.fire('Type Updated successfully.');
    }
  }

  private addType() {
    const typeData: IInsuranceType = {
      id: '',
      typeTitle: this.typeForm.controls['typeTitle'].value,
      isActive: this.typeForm.controls['status'].value,
    };
    this.adminService
      .addType(typeData)
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

  private editType() {
    const typeData: IInsuranceType = {
      id: this.id,
      typeTitle: this.typeForm.controls['typeTitle'].value,
      isActive: this.typeForm.controls['status'].value,
    };
    this.adminService.updateType(typeData)
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
      this.adminService
        .viewTypeById(this.id)
        .pipe(first())
        .subscribe((x) => this.typeForm.patchValue(x));
    }
  }
}