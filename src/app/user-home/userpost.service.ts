import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserpostService {

  constructor(private http: HttpClient) { }

  addCommentToPost(userId: any, commentData: any){
    const commentdata = {
      userId: userId,
      commentData: commentData
    }


  }
  editCurrentPost(){}
}
