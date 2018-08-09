import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api.service';

@Component({
  selector: 'app-admin-agent-master',
  templateUrl: './admin-agent-master.component.html',
  styleUrls: ['./admin-agent-master.component.css']
})
export class AdminAgentMasterComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  ngOnInit() {
  }

  onClick(){
    this.apiService.onCheckAuth();
  }

}
