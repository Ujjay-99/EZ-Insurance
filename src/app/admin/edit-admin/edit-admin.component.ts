import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AdminDataService } from '../admin-services/admin-data.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  editform: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
  constructor(
    private adminService:AdminDataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }
  
  get f() { return this.editform.controls; }
  
  onSubmit() {
    console.log(this.isAddMode);
    
    this.submitted = true;

    // if (this.editform.invalid) {       
    //   return;     
    // }
    if (this.isAddMode) {
      return
      
    } else {
      this.updateAdmin();
      Swal.fire('Admin Updated successfully.');
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

        this.editform = this.formBuilder.group({
            
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
              .subscribe(x => this.editform.patchValue(x));
      }

  }
//   private addEmployee() {
//     this.adminService.addEmployee(this.form.value)
//         .pipe(first())
//         .subscribe({
//             next: (response) => {
//               console.log(response);
//             },
//             error: (error) => {
//               console.log(error);
              
//             },
//         });
// }
private updateAdmin() {
  this.adminService.updateAdmin(this.editform.value)
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

