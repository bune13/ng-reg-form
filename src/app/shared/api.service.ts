import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, delay, debounceTime, distinctUntilChanged } from 'rxjs/operators';
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

  onCheckEmailTaken(email:string):Observable<any>{
    console.log('INTO Check Email Taken')
    return this.httpClient.post(`${this.api_url}preemailvalidation`, email, httpOptions)
      .pipe(debounceTime(2000))
      .pipe(delay(2000))
      .pipe(map(res=>res))
  }

  checkUserLogin(value){
    console.log('INTO Check User Credentials');
    return this.httpClient.post(`${this.api_url}login`, value, httpOptions)
      .subscribe(
        (result) => {console.log("onPreRegValidation successfully posted", result);},
        (error) => console.log('There was an error: ', error),
        () => {}
      )
  }

}
