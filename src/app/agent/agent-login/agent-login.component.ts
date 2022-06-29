import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee/employee.service';
import { AuthService } from 'src/app/helpers/auth.service';
import Swal from 'sweetalert2';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-agent-login',
  templateUrl: './agent-login.component.html',
  styleUrls: ['./agent-login.component.css'],
})
export class AgentLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: AgentService,
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
    this.dataService.agentLogin(payload).subscribe({
      next: (response) => {
        const token = (<any>response).token;
        this.authService.setToken('accessToken', token);
        console.log('Agent is logged in');
        this.router.navigate(['Agent/AgentDashboard']);
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
