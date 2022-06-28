import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  public jwtHelper: JwtHelperService = new JwtHelperService();
  
  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  canActivate(){
    const token = this.authService.getToken("accessToken");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }
}
