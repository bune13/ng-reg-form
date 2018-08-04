import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api_url:string="http://127.0.0.1:5000/"

  constructor(private httpClient:HttpClient) { }

  onRegPost(value){
    // return this.httpClient.post('http://127.0.0.1:5000/register', value, httpOptions)
    return this.httpClient.post(`${this.api_url}register`, value, httpOptions)
    .subscribe(
      (result) => {console.log("onPreRegValidation successfully posted");},
      (error) => console.log('There was an error: ', error),
      () => {console.log("The POST observable is now completed.")}
    );
  }

  onPreRegEmailVPost(email){
    console.log('IN')
    return this.httpClient.post(`${this.api_url}preemailvalidation`, email, httpOptions)
      .subscribe(
        (result)=>{console.log("onPreRegValidation successfully posted, result: ", result)},
        (error)=>{console.log('There was an error: ', error)},
        ()=>{console.log("The POST observable is now completed.")}
      );
  }

  // getFilmService(){
  //   return this.httpClient.get(`https://swapi.co/api/`, {observe:'body', responseType:'json'})
  //     .pipe(map(
  //       (data:Object)=>{
  //         console.log(data);
  //         return data;
  //       }
  //     ));
  // }

}
