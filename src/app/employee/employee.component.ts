import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminDataService } from '../admin/admin-services/admin-data.service';
import { AuthService } from '../helpers/auth.service';
import { IUser } from '../models/IUser';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  
  tokenPayload:any;
  token:any;
  output:any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  userID:string = "";
  employee:IUser = {
    id:'',
    userName:""
  };

  constructor(private authService:AuthService, 
    private router:Router, 
    private dataService:AdminDataService, 
    private empService: EmployeeService) {
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
    this.empService.setEmployeeId(this.userID);
    console.log("User ID " + this.userID);

    this.dataService.getUser(this.userID).subscribe(u => {
      this.employee = u;
      console.log(u.userName);
    });
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
  editEmployee(){
    
      console.log();
      this.router.navigate([`Employee/EditEmployee/${this.employee.id}`])    
   
  }


}
