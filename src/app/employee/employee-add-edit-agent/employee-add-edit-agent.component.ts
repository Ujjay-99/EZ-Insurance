import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/helpers/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ICustomer } from 'src/app/models/ICustomer';
import { EmployeeService } from '../employee.service';
import { IAgent } from 'src/app/models/IAgent';

@Component({
  selector: 'app-employee-add-edit-agent',
  templateUrl: './employee-add-edit-agent.component.html',
  styleUrls: ['./employee-add-edit-agent.component.css'],
})
export class EmployeeAddEditAgentComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  tokenPayload:any;
  token:any;
  output:any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  agentId:string;

  constructor(
    private adminService: AdminDataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private empService:EmployeeService
    ) {}

  get f() {
    return this.form.controls;
  }
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
      password: ['', Validators.required]
    });
    if (!this.isAddMode) {
      this.adminService
        .viewEmployeeById(this.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }
  private addAgent() {

    const payload:IAgent = {
      id : '',
      firstName : this.form.controls['firstName'].value,
      lastName : this.form.controls['lastName'].value,
      email : this.form.controls['email'].value,
      password : this.form.controls['password'].value,
      parentId : this.empService.getEmployeeId(),
      userName : this.form.controls['userName'].value,
      doB : this.form.controls['doB'].value,
      phoneNumber : this.form.controls['phoneNumber'].value
    }

    this.adminService
      .addAgent(payload)
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
    this.adminService
      .updateAgent(this.form.value)
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

  cancel() {
    this.router.navigate(['Employee/ViewAgent']);
  }
}
