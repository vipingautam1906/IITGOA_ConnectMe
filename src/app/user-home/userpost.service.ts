import { PortalHostDirective } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserpostService {
  private comments = []
  constructor(private http: HttpClient) { }

  addCommentToPost(userId: string, postId: string, message: any){
    const commentdata = {
      userId: userId,
      postId: postId,
      message: message
    }
    this.http.post<{message: string}>("http://localhost:5000/api/posts/comment", commentdata).subscribe((res=>{
      console.log(res.message)
    }))
  }
  
}
