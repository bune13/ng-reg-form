import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from '../shared/api.service';
import { map } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  regForm:FormGroup;
  alertAwake:boolean = false;

  constructor(private apiService: ApiService, private router:Router) { }

  onSubmit(){
    if(this.regForm.valid){
      console.log(this.regForm.value);
      console.log(this.regForm);
      this.alertAwake = true;
      this.apiService.onRegPost(this.regForm.value);
      setTimeout((router: Router) => {
        this.router.navigate(['/signin']);
      }, 4000);
      this.regForm.reset();
    }
  }

  onReset(){
    this.alertAwake = false;
    this.regForm.reset();
  }


  ngOnInit(){
    this.alertAwake = false;
    this.regForm = new FormGroup({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required),
      'business_name': new FormControl(null, Validators.required),
      'phone': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9*$]+\d/)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.checkNewEmailValidation.bind(this)),
      'address': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'pincode': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9*$]+\d/)]),
      'business_type': new FormControl(null, Validators.required),
    });
  }

  checkNewEmailValidation(control:FormControl){
    return this.apiService.onCheckEmailTaken(control.value)
      .pipe(map(
        (res)=>{
          return res == 1 ? {'emailIsForbidden':true} :  null;
        }
      ))
  }

  

}
