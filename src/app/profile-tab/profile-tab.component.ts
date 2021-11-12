import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.css']
})
export class ProfileTabComponent implements OnInit {
  @Output() clickInProfileTab = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  onClickUpdatePassword(data: string){
    this.clickInProfileTab.emit(data)
  }
  onClickViewMyPosts(data: string){
    this.clickInProfileTab.emit(data)
  }

}
