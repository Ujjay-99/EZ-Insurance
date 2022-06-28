import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminDataService } from '../admin-services/admin-data.service';
import { first, switchAll } from 'rxjs/operators';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {

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
      this.addAgent();
      Swal.fire('Agent added successfully.');
    } else {
      this.updateAgent();
      Swal.fire('Agent updated successfully.');
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
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
  private addAgent() {
    this.adminService.addAgent(this.form.value)
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
private updateAgent() {
  this.adminService.updateAgent(this.form.value)
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
  this.router.navigate(['Admin/ViewAgent']);
}

}
