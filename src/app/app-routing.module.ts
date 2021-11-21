import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from "./auth/signup/signup.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";

import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { UserHomeComponent } from "./user-home/user-home.component";

const routes: Routes= [
    {path : 'landing', component : LandingPageComponent},
    {path : 'create', component : PostCreateComponent, canActivate : [AuthGuard]},
    {path : 'edit/:postId', component : PostCreateComponent, canActivate : [AuthGuard]},
    {path : 'login', component : LoginComponent},
    {path : 'signup', component : SignUpComponent},
    {path : 'home', component : UserHomeComponent}
]
@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule],
    providers : [AuthGuard]
})
export class AppRoutingModule{

}