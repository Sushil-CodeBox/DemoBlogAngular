import { Component, OnInit } from '@angular/core';
import { RegisterViewModel } from '../register-view-model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validation } from '../Validations/validation';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  RegisterViewModel1:RegisterViewModel =new RegisterViewModel();
  form: FormGroup = new FormGroup({    
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),    
  });
  submitted = false;
  

  constructor (private formBuilder: FormBuilder, 
               private loginService: LoginService, 
               private router: Router,
               private toastr: ToastrService)
               {    
               }


  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {        
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required]
        
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );  
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    debugger
    this.submitted = true;

  /*   if (this.form.invalid) {
      return;
    } */
    this.loginService.Register(this.form.value).subscribe( 
      (response) =>
    {
      //alert(response.message);
      this.toastr.success("User has registered Successfully.");
      this.router.navigateByUrl("/login");

    },
    (error) =>
    {
      console.log(error);
      this.toastr.error("Invalid Username or Password");
    },);
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    debugger
    this.submitted = false;
    this.form.reset();
  }

 /*  onRegisterClick(event:any)
  {   
    console.log(this.RegisterViewModel1);
    this.loginService.Register(this.RegisterViewModel1).subscribe( 
      (response) =>
    {
      //alert(response.message);
      this.toastr.success("User has registered Successfully.");
      this.router.navigateByUrl("/login");
    },
    (error) =>
    {
      console.log(error);
      this.toastr.error("Invalid Username or Password");
    },
  )} */

}
