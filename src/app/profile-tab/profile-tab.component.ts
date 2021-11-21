import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.css']
})
export class ProfileTabComponent implements OnInit {
  fname: any;
  lname: any;
  aboutme: any;
  email : any;
  @Output() clickInProfileTab = new EventEmitter<string>();
  constructor(private authSer: AuthService) { }

  ngOnInit(): void {
    this.fname = this.authSer.getCurrentLoggedInUser().fname;
    this.lname = this.authSer.getCurrentLoggedInUser().lname;
    this.aboutme = this.authSer.getCurrentLoggedInUser().aboutMe;
    this.email = this.authSer.getCurrentLoggedInUser().email;
    
  }
  onClickUpdatePassword(data: string){
    this.clickInProfileTab.emit(data)
  }
  onClickViewMyPosts(data: string){
    this.clickInProfileTab.emit(data)
  }

}
