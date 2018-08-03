import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm:FormGroup
  forgetPassword:FormGroup
  flip:Boolean
  resetMailSend:Boolean
 

  constructor(private apiService:ApiService, private router:Router) { }

  onLogin(){
    if(this.signInForm.valid){
      console.log(this.signInForm.value);
      console.log(this.signInForm);
      this.apiService.checkUserLogin(this.signInForm.value);
      this.apiService.onSubmitButton();      
      this.signInForm.reset();
      
    }
  }

  doFlip(){
    this.flip=!this.flip;
  }

  resetPassword(){
    if(this.forgetPassword.valid){
console.log('reset your password yoooooo');
this.resetMailSend=true;
    }
  }

  ngOnInit() {
    this.flip=false;
    this.signInForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    });
    this.forgetPassword = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });
  }

}
