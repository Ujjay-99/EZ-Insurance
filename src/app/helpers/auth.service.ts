import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  setToken(input:string, token:string){
    localStorage.setItem(input, token);
  }

  getToken(input:string){
    return localStorage.getItem(input);
  }

  isLoggedIn(input:string){
    return this.getToken(input) !== null;
  }

  logout(){
    localStorage.removeItem("accessToken");
    this.router.navigate(['/']);
  }
}
