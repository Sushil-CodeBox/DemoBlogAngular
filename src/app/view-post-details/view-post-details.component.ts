import { Component } from '@angular/core';
import { BlogPostServiceService } from '../blog-post-service.service';
import { Post } from '../post';
import { Comment } from '../comment';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-view-post-details',
  templateUrl: './view-post-details.component.html',
  styleUrls: ['./view-post-details.component.scss']
})
export class ViewPostDetailsComponent {
  imageFile: File | undefined;

  constructor(private blogPostService: BlogPostServiceService, public loginservice: LoginService) { }

  post = { title: '', description: '', image: '' }
  CommentText: string = '';
  currentPostId: number = 0;
  commentdata: Comment[] = [];
  postdata: Post[] = [];

  postrefid: any = '';
  toggleStates: boolean[] = [];

  Designation: string = "";
  Username: string = "";
  NoOfFriends: number = 0;
  TotalCostOfAllProjects: number = 0;
  PendingTasks: number = 0;
  UpComingProjects: number = 0;
  ProjectCost: number = 0;
  CurrentExpenditure: number = 0;
  AvailableFunds: number = 0;
  ToDay: Date = new Date();

  Links: string[] = [];
  Projects: string[] = [];
  Years: number[] = [];
  TeamMembersSummary: any = [];
  TeamMembers: any = [];


  //Excecuting toggleDiv fuction from HTML pages
  toggleDiv(index: number) {
    
    this.toggleStates[index] = !this.toggleStates[index]; // this is to hide and show commnet div
    this.currentPostId = this.postdata[index].id; //This is to get current postid of the post. 
  }

  //Excecuting getCommentsForPost fuction from HTML pages
  getCommentsForPost(): Comment[] | undefined {
    debugger;
    //here we are filltering post data on post id to get its related comments.
    const selectedPost: any = this.postdata.find(post => post.id === this.currentPostId);
    //const s= selectedPost ? selectedPost.comments : undefined;
    return selectedPost ? selectedPost.comments : undefined;
  }
  
  

  ngOnInit() {
    this.Designation = "Profile";
    this.Username = "First Name";
    this.NoOfFriends = 67;
    this.TotalCostOfAllProjects = 240;
    this.PendingTasks = 15;
    this.UpComingProjects = 0.2;
    this.ProjectCost = 2113507;
    this.CurrentExpenditure = 96788;
    this.AvailableFunds = 52536;
    this.ToDay = new Date();

    this.Links = [
      "LinkedIn", "Github", "Facebook"
    ];

    //on viewpost page load all the images and data from database will load
    this.OnPageLoad();
  }


  //Page load initially load all data from database Post and comment table
  OnPageLoad() {
    
    this.blogPostService.getAllViewPost().subscribe(
      (result: any) => {
        debugger;
        console.log(result);
        this.postdata = result;
        // this.imagePaths=result.image; 
        return result;
      },
      (error: any) => {
        console.log(error);
        alert("Authentication Fails..!");
      }
    )
  }




  onFileSelected(event: any): void {
    
    const file: File = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      this.imageFile = file;
      this.blogPostService.ImageFile = event.target.files[0];
    } else {
      console.log('Image file not found');
    }
  }

  onSaveCommentClick() {
    
    console.log(this.currentPostId, this.CommentText);
    this.blogPostService.AddComment(this.currentPostId, this.CommentText,).subscribe(
      (response: Comment) => {
        console.log(response);
        this.CommentText = '';
        this.OnPageLoad();
      },
      (error: any) => { console.log(error); alert(error); });
      //After submitting commet it shold load component to view new comment
      //this.OnPageLoad();
  }


  onSaveClick() {
    debugger;
    // Call the service method to create the post   
    this.blogPostService.createPost(this.post).subscribe(
      (response: any) => {
        console.log(response);
        // Reset form fields
        this.post = { title: '', description: '', image: '' };
        this.OnPageLoad();
      },
      (error: any) => { console.error(error); });

    //Here we are calling Pageload function so that newly added posts can be loaded on same page

  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    // Handle the uploaded image (e.g., display preview) 
    console.log(file); this.imageFile = file;
  }
}



