export class Post {
    id:number = 0;
    title:any='';
    description:any='';
    date:any='';
    image:any='';
    userRefId:string='';
    commentCount:number=0;
    likeCount:number=0;
    like:any='';
    comments:Comment[]=[];
}


