import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.apiService.getFilmService().subscribe(
      (data)=>{
        console.log(data);
      });
  }

}
