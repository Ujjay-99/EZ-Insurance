import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminDataService } from '../admin/admin-services/admin-data.service';
import { AuthService } from '../helpers/auth.service';
import { IUser } from '../models/IUser';
import { AgentService } from './agent.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  tokenPayload:any;
  token:any;
  output:any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  userID:string = "";
  agent:IUser = {
    id:'',
    userName:""
  };

  constructor(private authService:AuthService, 
            private router:Router, 
            private dataService:AdminDataService,
            private agentService:AgentService) {
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

    this.agentService.setAgentId(this.userID);

    this.dataService.getUser(this.userID).subscribe(u => {
      this.agent = u;
      console.log(u.userName);
    });
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
  editAgent(){
    
    console.log();
    this.router.navigate([`Agent/EditAgent/${this.agent.id}`])    
 
}

}
