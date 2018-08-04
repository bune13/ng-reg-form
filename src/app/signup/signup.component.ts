import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';

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
      this.apiService.onApiPost(this.regForm.value);
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
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'address': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'pincode': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9*$]+\d/)]),
      'business_type': new FormControl(null, Validators.required),
    });

  }

  

}
