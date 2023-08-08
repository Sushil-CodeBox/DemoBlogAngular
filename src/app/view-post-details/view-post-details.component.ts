import { Component } from '@angular/core';
import { BlogPostServiceService } from '../blog-post-service.service';
import { Post } from '../post';
import { Comment } from '../comment';
import { LoginService } from '../login.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-view-post-details',
  templateUrl: './view-post-details.component.html',
  styleUrls: ['./view-post-details.component.scss']
})
export class ViewPostDetailsComponent {
  imageFile: File | undefined;

  constructor(private blogPostService: BlogPostServiceService, public loginservice: LoginService,private toastr: ToastrService) { }

  post = { title: '', description: '', image: '' }
  CommentText: string = '';
  currentPostId: number = 0;
  commentdata: Comment[] = [];
  postdata: Post[] = [];

  postrefid: any = '';
  toggleStates: boolean[] =[];

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
  previousIndex:any=null;

  p:number = 1;

  //Excecuting toggleDiv fuction from HTML pages
  toggleDiv(index: number) {
    if(this.toggleStates[this.previousIndex]!=this.toggleStates[index])
    {
      this.toggleStates[this.previousIndex]=false;
    }
    this.toggleStates[index] = !this.toggleStates[index]; // this is to hide and show commnet div
    this.previousIndex=index;
    this.currentPostId = this.postdata[index].id; //This is to get current postid of the post. 
  }

  //Excecuting getCommentsForPost fuction from HTML pages
  getCommentsForPost(): Comment[] | undefined {
    debugger;
    //here we are filltering post data on post id to get its related comments.
    const selectedPost: any = this.postdata.find(post => post.id === this.currentPostId);
    //const s= selectedPost ? selectedPost.comments : undefined;
    // Sort the comments by id in descending order
    const sortedComments = selectedPost.comments.sort((a:any,b:any)=>b-a);
    console.log(sortedComments);
    return sortedComments ? sortedComments : undefined;
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
        //this.toastr.success("Data loaded successfully");
        return result;
      },
      (error: any) => {
        console.log(error);
        this.toastr.error("Authentication Fails..!");
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
      this.toastr.error("Image file not found");
    }
  }

  onSaveCommentClick() {
    debugger
    console.log(this.currentPostId, this.CommentText);
    this.blogPostService.AddComment(this.currentPostId, this.CommentText,this.loginservice.currentUser).subscribe(
      (response: Comment) => {
        console.log(response);
        this.toastr.success("Comment added successfully");
        this.CommentText = '';
        this.OnPageLoad();
      },
      (error: any) => { console.log(error); alert(error); this.toastr.error("Issue while adding comment.");});
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
        this.toastr.success("Data uploaded successfully");
        this.post = { title: '', description: '', image: '' };
        this.OnPageLoad();
      },
      (error: any) => { console.error(error); this.toastr.error("There is issue in uploading data.");});

    //Here we are calling Pageload function so that newly added posts can be loaded on same page

  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    // Handle the uploaded image (e.g., display preview) 
    console.log(file); this.imageFile = file;
  }
}



