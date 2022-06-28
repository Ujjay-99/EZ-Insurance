import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, switchAll } from 'rxjs/operators';
import { AdminDataService } from '../admin-services/admin-data.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
  constructor(
    private adminService:AdminDataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }
  
  get f() { return this.form.controls; }
  
  onSubmit() {
    console.log(this.isAddMode);
    
    this.submitted = true;

    // if (this.form.invalid) {       
    //   return;     
    // }
    if (this.isAddMode) {
      this.addEmployee();
      Swal.fire('Employee added successfully.');
      
    } else {
      this.updateEmployee();
      Swal.fire('Employee Updated successfully.');
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            
            id: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            doB: ['', Validators.required],
            userName: ['', Validators.required],
            phoneNumber: ['', Validators.required],   
            password: ['', Validators.required],     

        });
        if (!this.isAddMode) {
          this.adminService.viewEmployeeById(this.id)
              .pipe(first())
              .subscribe(x => this.form.patchValue(x));
      }

  }
  private addEmployee() {
    this.adminService.addEmployee(this.form.value)
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
private updateEmployee() {
  this.adminService.updateEmployee(this.form.value)
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

cancel(){
  this.router.navigate(['Admin/ViewEmployee']);
}
}
