import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../helpers/auth.service';
import { IAdmin } from '../models/IAdmin';
import { IUser } from '../models/IUser';
import { AdminDataService } from './admin-services/admin-data.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  tokenPayload:any;
  token:any;
  output:any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  userID:string = "";
  
  admin:IUser = {
    id:'',
    userName:""
  };

  constructor(private authService:AuthService, private router:Router, private dataService:AdminDataService) {
    if(authService.getToken("accessToken")!==null){
      console.log("Logged in.")
    }else this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.refreshUser();
  }

  private refreshUser() {
    console.log("User refreshed.")
    if (this.authService.getToken("accessToken") == null) {
      this.router.navigate(['/Login']);
    }
    this.token = this.authService.getToken("accessToken");
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.token));
    this.output = JSON.parse(this.tokenPayload);
    this.userID = this.output['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

    console.log("User ID " + this.userID);

    this.dataService.getUser(this.userID).subscribe(u => {
      this.admin = u;
      console.log(u.userName);
    });
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  editAdmin(){
    console.log();
    this.router.navigate([`Admin/EditAdmin/${this.admin.id}`])    
  }

}
