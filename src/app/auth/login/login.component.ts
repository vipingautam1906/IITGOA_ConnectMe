import {Component, OnInit} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl : './login.component.html',
  styleUrls : ['./login.component.css']
})

export class LoginComponent implements OnInit{
  registrationForm: FormGroup
  constructor(public authService : AuthService){ }

  ngOnInit(){
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, emailDomain] ),
        pass: new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }

  onLogin(){
    this.authService.login(this.registrationForm.get('email').value.toString(),
    this.registrationForm.get('pass').value.toString());
    
    this.registrationForm.reset()
  }
}

function emailDomain(control: AbstractControl): {[key: string]: any} | null {
  const email: string = control.value;
  const domain  = email.substring(email.lastIndexOf('@')+1);
  if(email === '' || domain.toLowerCase() === "iitgoa.ac.in"){
    return null;
  }
  else{
    return {'emailDomain': true };
  }
  
}
