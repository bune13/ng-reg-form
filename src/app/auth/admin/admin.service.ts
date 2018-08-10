import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // api_url:string="http://127.0.0.1:5000/"
  api_url:string="http://192.168.0.175:5000/"

  constructor(private httpClient:HttpClient, private router:Router) { }

  // downloadTemplate(){
  //   console.log('Downloading Template....');
  //   return this.httpClient.post(`${this.api_url}download_template`, null, httpOptions).;
  //   // return  this.httpClient.get(`${this.api_url}`, {observe:'body', responseType:'json'})
  //   //   .pipe(map(
  //   //     (data:Object) => {
  //   //       return data;
  //   //     }
  //   //   ));
  // }

  onUploadFileDB(value){
    return this.httpClient.post(`${this.api_url}upload`, value, httpOptions).subscribe(
      (result)=>{
        console.log(result);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  


}