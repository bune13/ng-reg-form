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

  constructor(private apiService:ApiService, private router:Router) { }

  onLogin(){
    if(this.signInForm.valid){
      console.log(this.signInForm.value);
      console.log(this.signInForm);
      // this.apiService.checkUserLogin(this.signInForm.value);
      this.apiService.onSubmitButton();
      this.router.navigate(['/admin']);
      this.signInForm.reset();
    }
  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    });
  }

}
