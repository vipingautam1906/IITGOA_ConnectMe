import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { PostsService } from 'src/app/posts/posts.service';
import { UserpostService } from '../userpost.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit, OnChanges {

  userIsAuthenticated=false;
  private authListenerSubs: Subscription;
  userPosts =[];
  postsPerPage=2;
  pageNumber=2;
  pageSizeOptions=[1,2,5,10];
  panelOpenState = false;
  userId: any;
  totalPosts=0;
  private postSubs : Subscription;
  
  comment = new FormControl()
  constructor(private postSer: PostsService ,
            private authSer : AuthService, 
            private userPostSer: UserpostService
  ) { }

  ngOnChanges(){
    this.postSer.getPosts(this.postsPerPage,this.pageNumber);
    this.userId=this.authSer.getUserId();
    this.postSubs=this.postSer.getPostsUpdated()
           .subscribe((postData : {posts : any, postCount : number})=>{
             console.log(postData.posts)
             this.userPosts=postData.posts;
             this.totalPosts=postData.postCount;
           });
    
           console.log("change detected")
  }

  ngOnInit(): void {
    this.postSer.getPosts(this.postsPerPage,this.pageNumber);
    this.userId=this.authSer.getUserId();
    this.postSubs=this.postSer.getPostsUpdated()
           .subscribe((postData : {posts : any, postCount : number})=>{
             console.log(postData.posts)
             this.userPosts=postData.posts;
             this.totalPosts=postData.postCount;
           });
    this.userIsAuthenticated=this.authSer.getAuthentication();

    this.authListenerSubs=this.authSer
      .getAuthStatusListener()
        .subscribe(isAuthenticated=>{
                     this.userIsAuthenticated=isAuthenticated;
                     this.userId=this.authSer.getUserId();
           })

  }

  onChangedPage(pagedata : PageEvent){
    this.postsPerPage=pagedata.pageSize;
    this.pageNumber=pagedata.pageIndex+1;
    this.postSer.getPosts(this.postsPerPage,this.pageNumber);
  }

  onAdd(post_id: string){
    const userId = this.authSer.getUserId()
    const commentData =  this.comment.value.toString()
    this.userPostSer.addCommentToPost(userId,post_id, commentData)
    this.comment.reset()
  }

  ngOnDestroy(){
    this.postSubs.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }

}
