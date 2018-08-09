import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { ApiService } from '../../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private apiService:ApiService) { }

  intercept(req,next){
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization:`Bearer ${this.apiService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
