import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api_url:string="http://127.0.0.1:5000/";
  validEmail:number;

  constructor(private httpClient:HttpClient) { }

  onRegPost(value){
    return this.httpClient.post(`${this.api_url}register`, value, httpOptions)
    .subscribe(
      (result) => {console.log("onPreRegValidation successfully posted", result);},
      (error) => console.log('There was an error: ', error),
      () => {}
    );
  }

  onPreRegEmailVPost(email){
    console.log('IN')
    return this.httpClient.post(`${this.api_url}preemailvalidation`, email, httpOptions)
      .subscribe(
        (result)=>{
          console.log("onPreRegValidation successfully posted, result: ", result);
          this.validEmail = <number>result;
          console.log("@@@@@@@@@@@@@@@@@@",this.validEmail)
        },
        (error)=>{console.log('There was an error: ', error)},
        ()=>{}
      );
  }

  onCheckEmailTaken(email:string):Observable<any>{
    console.log('INTO')
    return this.httpClient.post(`${this.api_url}preemailvalidation`, email, httpOptions)
      .pipe(delay(2000))
      .pipe(map(res=>res))
  }

}
