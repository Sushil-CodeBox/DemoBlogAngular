import { Component, OnInit } from '@angular/core';
import { RegisterViewModel } from '../register-view-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent   {
  RegisterViewModel1:RegisterViewModel =new RegisterViewModel();

  constructor (private formBuilder: FormBuilder, private loginService: LoginService, private router: Router){
    
  }

  onRegisterClick(event:any)
  {   
    console.log(this.RegisterViewModel1);
    this.loginService.Register(this.RegisterViewModel1).subscribe( 
      (response) =>
    {
      alert(response.message);
      this.router.navigateByUrl("/login");
    },
    (error) =>
    {
      console.log(error);
     // this.loginError = "Invalid Username or Password";
    },
  )}

}
