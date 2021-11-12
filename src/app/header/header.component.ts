import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls :['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  userIsAuthenticated=false;
  private authListenerSubs: Subscription;
  msgfromLeftpanel = ""
  constructor(private authService: AuthService){}

  ngOnInit(){
    this.userIsAuthenticated=this.authService.getAuthentication();
    this.authListenerSubs=this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated=>{
          this.userIsAuthenticated=isAuthenticated;
        })
  }

  onLogout(){
    this.authService.logout();
  }

  onclickleftsidepanel(value: string){
    this.msgfromLeftpanel = value;
  }

  onclickProfileTab(value: string){
    this.msgfromLeftpanel = value;
  }
  
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }


}
