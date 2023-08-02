import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Login } from '../login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginViewModel: Login = new Login();
  loginError: string = "";
  constructor(private loginService: LoginService, private router: Router)
  {

  }
  onLoginClick(event: any)
  {
    this.loginService.Login(this.loginViewModel).subscribe(
      (response) =>
      {
        this.router.navigateByUrl("/viewpost");
      },
      (error) =>
      {
        console.log(error);
        this.loginError = "Invalid Username or Password";
      },
    );
  }

  onSigninClick(event:any)
  {
    this.loginService.Login(this.loginViewModel).subscribe(
      (response) =>
      {
        this.router.navigateByUrl("/register");
      }      
    );
  }
}
