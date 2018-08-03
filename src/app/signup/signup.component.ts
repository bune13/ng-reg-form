import { Component, OnInit } from '@angular/core';
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


  ngOnInit() {

    this.regForm = new FormGroup({
      'fname': new FormControl("null", Validators.required),
      'lname': new FormControl("null", Validators.required),
      'bname': new FormControl("null", Validators.required),
      'phone': new FormControl("9123", Validators.required),
      'email': new FormControl("null@com", [Validators.required, Validators.email]),
      'address': new FormControl("null", Validators.required),
      'city': new FormControl("null", Validators.required),
      'state': new FormControl("null", Validators.required),
      'pcode': new FormControl("9123", Validators.required),
      'typeb': new FormControl("null", Validators.required),
    });

  }

  

}
