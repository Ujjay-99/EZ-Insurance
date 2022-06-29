import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { AuthService } from 'src/app/helpers/auth.service';
import Swal from 'sweetalert2';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css'],
})
export class EmployeeLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const val = this.loginForm.value;
    const payload = {
      userName: val.username,
      password: val.password,
    };
    this.dataService.employeeLogin(payload).subscribe({
      next: (response) => {
        const token = (<any>response).token;
        this.authService.setToken('accessToken', token);
        console.log('Employee is logged in');
        this.router.navigate(['Employee/EmployeeDashboard']);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Credentials',
          text: 'please try Again...!',
        });
      },
    });
  }
  
  ngOnInit(): void {}
}
