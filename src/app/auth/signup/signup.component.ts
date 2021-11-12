import {Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl : './signup.component.html',
  styleUrls : ['./signup.component.css']
})

export class SignUpComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(public authService : AuthService){ }

  ngOnInit(){
    this.registrationForm = new FormGroup({
        fname: new FormControl('', Validators.required),
        lname: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email, emailDomain] ),
        pass: new FormControl('',[Validators.required, Validators.minLength(6)]),
        aboutMe : new FormControl('', Validators.required)
      })
  }
  onSignUp(){
    this.authService.createUser(
      this.registrationForm.get('fname').value.toString(),
      this.registrationForm.get('lname').value.toString(),
      this.registrationForm.get('email').value.toString(),
      this.registrationForm.get('pass').value.toString(),
      this.registrationForm.get('aboutMe').value.toString()
    )
    this.registrationForm.reset();
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
