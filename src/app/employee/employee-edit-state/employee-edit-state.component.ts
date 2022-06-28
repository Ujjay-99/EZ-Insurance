import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IState } from 'src/app/models/IState';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-employee-edit-state',
  templateUrl: './employee-edit-state.component.html',
  styleUrls: ['./employee-edit-state.component.css']
})
export class EmployeeEditStateComponent implements OnInit {
  stateForm: FormGroup;
  id: string;
  isAddMode: boolean; 
  submitted = false;

  sName:string =""
  // status:FormControl
  constructor(private adminService: AdminDataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,) { }

    onSubmit() {
      console.log(this.isAddMode);
      this.submitted = true;

      
      if (this.isAddMode) {
        this.addState();
      } else {
       this.editState();
      }
    }
    get f() {
      return this.stateForm.controls;
    }
    private addState() {
      const stateData:IState={
        id:'',
        stateName:this.stateForm.controls['stateName'].value,
        isActive:this.stateForm.controls['status'].value
  
      }
      this.adminService
        .addState(stateData)
        .pipe(first())
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          },
        });
        Swal.fire('State Added successfully.');
    }

    private editState() {
      const stateData:IState={
        id:this.id,
        stateName:this.stateForm.controls['stateName'].value,
        isActive:this.stateForm.controls['status'].value
  
      }
      this.adminService.updateState(stateData)
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
    this.stateForm = this.formBuilder.group({
      stateName: ['', Validators.required],
      status: [null, Validators.required]
    });
    if (!this.isAddMode) {
      this.adminService
        .viewStateById(this.id)
        .pipe(first())
        .subscribe((x) => this.stateForm.patchValue(x));
    }
}
}
