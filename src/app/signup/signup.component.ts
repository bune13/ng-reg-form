import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { ApiService } from '../shared/api.service';
import { componentFactoryName } from '../../../node_modules/@angular/compiler';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  regForm:FormGroup

  constructor(private apiService: ApiService) { }

  onSubmit(){
    if(this.regForm.valid){
      console.log(this.regForm.value);
      this.apiService.onRegPost(this.regForm.value);
      this.onReset();
    }
  }

  onReset(){
    this.regForm.reset();
  }


  ngOnInit(){
    this.regForm = new FormGroup({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required),
      'business_name': new FormControl(null, Validators.required),
      'phone': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9*$]+\d/)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.checkEmailValidation.bind(this)),
      'address': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'pincode': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9*$]+\d/)]),
      'business_type': new FormControl(null, Validators.required),
    });
  }

  checkEmailValidation(control:FormControl): Promise<any>| Observable<any>{
    const promise = new Promise<any>(
      (resolve, reject)=>{
        setTimeout(()=>{
          // this.apiService.onPreRegEmailVPost(control.value);
          if(control.value == "test@test.com"){
            resolve({'emailIsForbinner':true})
          }
          else{
            resolve(null);
          }
        },1000);        
      }
    )
    return promise;
  }

  

}
