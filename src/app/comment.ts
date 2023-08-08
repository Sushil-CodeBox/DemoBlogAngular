export class Comment {    
    id: number;
    commentText: string;
    date: any;
    postRefID: number;
    post: any;
    userid :string;
    username:string;

    constructor() {
        this.id=0
        this.postRefID=0;
        this.commentText='';
        this.date='';
        this.post=null;
        this.username='';
        this.userid='';
    }
}
