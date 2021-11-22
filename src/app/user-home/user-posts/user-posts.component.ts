import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { PostsService } from 'src/app/posts/posts.service';
import { UserpostService } from '../userpost.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  panelOpenState = false;
  postId: any;
  postTitle: string;
  postContent: string;

  comment = new FormControl()
  constructor(private postSer: PostsService ,private authSer : AuthService, private userPostSer: UserpostService) { }

  ngOnInit(): void {
  }

  onAdd(){
    const userId = this.authSer.getUserId
    const commentData =  this.comment.value.toString()
    this.userPostSer.addCommentToPost(userId,commentData)
    this.comment.reset()
  }

  onEditPost(){
    
  }

}
