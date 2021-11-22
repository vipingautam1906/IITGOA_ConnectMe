import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { UpdatePasswordService } from '../update-password.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  udatePasswordForm: FormGroup;
  isCurrentPassword: Boolean = true;
  constructor(public updatPassSer: UpdatePasswordService, public authSer: AuthService,
    private _snackbar: MatSnackBar ) { }

  ngOnInit(): void {
    this.udatePasswordForm = new FormGroup({
      c_pass: new FormControl('', [Validators.required] ),
        pass: new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }
  onUpdate(){
    const currentPassword = this.udatePasswordForm.get('c_pass').value.toString()
    const newPassword = this.udatePasswordForm.get('pass').value.toString()
    const userId = this.authSer.getUserId()
    
    this.isCurrentPassword = this.updatPassSer.updatePassword(currentPassword, newPassword, userId)
    
    if(this.isCurrentPassword === false ){
      this._snackbar.open('Existing Password is incorrect','Retry changing Password')
    }
    else{
      this._snackbar.open('New Password updated','Sucessfully!')
    }
    this.udatePasswordForm.reset();
  }
  
}
