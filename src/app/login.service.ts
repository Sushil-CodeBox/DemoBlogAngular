import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Login } from './login';
import { RegisterViewModel } from './register-view-model';
import { BlogPostServiceService } from './blog-post-service.service';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,private router: Router,private blogpostservice: BlogPostServiceService)
  {
  }

  currentUser: any = null;


  public Login(Login:Login): Observable<any>
  {
    
    return this.httpClient.post<any>("http://localhost:5056/api/Authenticate/login",Login, { responseType: "json" })
      .pipe(map(user =>
      {
        if (user)
        {
          debugger;
          this.currentUser = user.userName; 
                 
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          // console.log(user.userName)
          // this.currentUser = user.userName;
          // console.log(user.userid)
          this.blogpostservice.userid = user.userId;
        }
        return user;
      }));
  }

  public onSigninClick()
  {
    this.currentUser = null;
    this.router.navigateByUrl("/login");
  }
//signUpViewModel: RegisterViewModel
  public Register(form:Form): Observable<any> {
    debugger
    return this.httpClient.post<any>("http://localhost:5056/api/authenticate/register", form, { responseType: "json", observe: "response" })
      .pipe(map(response => {
        if (response) {
          debugger;
          console.log(response);
          //this.currentUser = response.body.userName;          
          //sessionStorage[this.currentUser] = JSON.stringify(response);
         // sessionStorage.XSRFRequestToken = response.headers.get("XSRF-REQUEST-TOKEN");
        }
        return response.body;
      }));
  }


  public Logout()
  {
    sessionStorage.removeItem("currentUser")
    this.router.navigateByUrl("/login");
    this.currentUser = null;
  }

  
}
