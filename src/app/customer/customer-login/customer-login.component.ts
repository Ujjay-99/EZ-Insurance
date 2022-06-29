import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/helpers/auth.service';
import Swal from 'sweetalert2';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {

  loginForm:FormGroup;

    constructor(private fb:FormBuilder, 
                private dataService: CustomerService, 
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
            this.dataService.customerLogin(payload)
                .subscribe({
                  next:(response) => {
                        const token = (<any>response).token;
                        this.authService.setToken("accessToken", token);
                        console.log("User is logged in");
                        this.router.navigate(["Customer/CustomerDashboard"]);
                    },
                    error: (error) => {
                      Swal.fire({
                        icon: 'error',
                        title: 'Invalid Credentials',
                        text: 'please try Again...!',
                      });
                    },
                }
                    
                );
              
                
    }

  ngOnInit(): void {
  }

}
