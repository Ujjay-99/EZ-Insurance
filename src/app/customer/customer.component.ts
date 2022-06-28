import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminDataService } from '../admin/admin-services/admin-data.service';
import { AuthService } from '../helpers/auth.service';
import { ICustomer } from '../models/ICustomer';
import { IUser } from '../models/IUser';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  tokenPayload:any;
  token:any;
  output:any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  userID:string = "";
  customer:IUser;

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  editCustomer(){
    console.log();
    this.router.navigate([`Customer/EditCustomer/${this.customer.id}`])    
  }

  constructor(private authService:AuthService, 
            private router:Router, 
            private dataService:AdminDataService,
            private customerService:CustomerService) {
            
      if(authService.getToken("accessToken")!==null) console.log("Logged in.") 
      else this.router.navigate(['/']);
      }
  ngOnInit(): void {
    this.refreshUser();
  }

  private refreshUser() {
    console.log("User refreshed.")
    if (this.authService.getToken("accessToken") == null) {
      this.router.navigate(['/']);
    }
    this.token = this.authService.getToken("accessToken");
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.token));
    this.output = JSON.parse(this.tokenPayload);
    this.userID = this.output['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

    this.customerService.setCustomerId(this.userID);

    this.dataService.getUser(this.userID).subscribe(u => {
      this.customer = u;
    });
  }
}

 // customer:ICustomer = {
  //   id:"",
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   userName: "",
  //   address:"",
  //   city:"",
  //   state:"",
  //   pincode:"",
  //   nominee:"",
  //   nomineeRelation:"",
  //   doB: "",
  //   phoneNumber: ""
  // };