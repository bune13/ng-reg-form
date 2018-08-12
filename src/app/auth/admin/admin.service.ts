import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptions2 = {
  headers: new HttpHeaders({ 'Content-Type': 'application/vnd.ms-excel' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  value:Object;

  constructor(private httpClient:HttpClient, private router:Router, private apiService:ApiService) { }

  api_url:string=this.apiService.getMainLink();  

  downloadTemplate(){
    console.log('Downloading Template....');
    // return this.httpClient.post(`${this.api_url}download_template`, null, httpOptions);
    return this.httpClient.get(`${this.api_url}download_template`, {observe:'body'})
      .pipe(map(
        (data:Object) => {
          return data;
        }
      ));
  }

  onUploadFileDB(fd){
    return this.httpClient.post(`${this.api_url}upload`, fd);
  }
  


}