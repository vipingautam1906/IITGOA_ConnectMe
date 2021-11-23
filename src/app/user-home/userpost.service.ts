import { PortalHostDirective } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserpostService {
  private comments = []
  constructor(private http: HttpClient) { }

  addCommentToPost(userId: any, commentData: any){
    const commentdata = {
      userId: userId,
      commentData: commentData
    }
  }
  
  getAllComments(){
    this.http.get<{message : string, comments: [] }>("").subscribe((res=>{
      this.comments = res.comments;
    }))
    return this.comments;
  }

}
