import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ViewPostDetailsComponent } from './view-post-details/view-post-details.component';
import { PostFormModalComponent } from './post-form-modal/post-form-modal.component';


const routes: Routes = [ 
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "register", component: RegistrationFormComponent },
  { path: "login", component: LoginComponent }, 
  { path: "viewpost", component: ViewPostDetailsComponent },
  { path: "PostForm", component: PostFormModalComponent }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
