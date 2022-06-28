import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.css']
})
export class EditAgentComponent implements OnInit {
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
      this.updateAgent();
      Swal.fire('Agent Updated successfully.');
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
          this.adminService.viewAgentById(this.id)
              .pipe(first())
              .subscribe(x => this.editform.patchValue(x));
      }

  }

private updateAgent() {
  this.adminService.updateAgent(this.editform.value)
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



}