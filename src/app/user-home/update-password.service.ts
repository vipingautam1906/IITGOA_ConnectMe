import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {
  constructor(private http : HttpClient) { }
  id: any;
  
  updatePassword(currentPassword: any, newPassword: any, userId: any): boolean{
    const passwordData = {
        currentPassword: currentPassword,
        newPassword: newPassword,
        userId: userId
      }
      console.log(passwordData)
      this.http.post<{Id: string}>('http://localhost:5000/api/user/updatePass',passwordData).subscribe(
        response=>{
          this.id = response.Id
        });
      if(this.id != userId){
        return false;
      }
  }
}
