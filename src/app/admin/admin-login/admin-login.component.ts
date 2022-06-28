import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/helpers/auth.service';
import { IUser } from 'src/app/models/IUser';
import { AdminDataService } from '../admin-services/admin-data.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginForm:FormGroup;

    constructor(private fb:FormBuilder, 
                private dataService: AdminDataService, 
                private authService: AuthService,
                private router: Router) {

        this.loginForm = this.fb.group({
            username: ['',Validators.required],
            password: ['',Validators.required]
        });
    }

    login() {
        const val = this.loginForm.value;
        const payload = {
          userName:val.username,
          password:val.password
        }
            this.dataService.adminlogin(payload)
                .subscribe(
                    (response) => {
                        const token = (<any>response).token;
                        this.authService.setToken("accessToken", token);
                        console.log("User is logged in");
                        this.router.navigate(["Admin/AdminDashboard"]);
                    }
                );
    }

  ngOnInit(): void {
  }

}
