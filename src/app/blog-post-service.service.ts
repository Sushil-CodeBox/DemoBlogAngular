import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class BlogPostServiceService {
  
  apiUrl: string = 'http://localhost:5056/api/Post/CreatePost'
  public ImageFile:any; 
  public userid:any;
 
  constructor(private httpClient: HttpClient,private router: Router) { }

  //Passing comment to database based on Post id
  AddComment(currentpostid: any, comment:string) {
      const formData = new FormData();    
    formData.append('PostRefID', currentpostid); 
    formData.append('CommentText', comment);   
    
    return this.httpClient.post<any>("http://localhost:5056/api/Post/savecomment",formData);
  }

  createPost(post: any): Observable<any> 
  {    
   /*  var currentUser={token:""};
    var headers = new HttpHeaders();    
    if (sessionStorage['currentUser'] != null) {
      currentUser = JSON.parse(sessionStorage['currentUser']);
      //headers = headers.set("Authorization", "Bearer " + currentUser.token);
       headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      });
    } */
    const formData = new FormData(); 
    formData.append('title', post.title); 
    formData.append('description', post.description); 
    formData.append('logedInUserID', this.userid); 
    formData.append('Image',this.ImageFile );
    
    return this.httpClient.post<any>(this.apiUrl,formData,{responseType:"json"});
  }

  getAllViewPost(): Observable<any> {
   
    return this.httpClient.get<any>("http://localhost:5056/api/Post/viewpost").pipe(map(
      (data: any) => {
        return data;
      }
    ));

  }
}
