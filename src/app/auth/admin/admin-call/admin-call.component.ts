import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-call',
  templateUrl: './admin-call.component.html',
  styleUrls: ['./admin-call.component.css']
})
export class AdminCallComponent implements OnInit {

  constructor(private adminService:AdminService) { }

  ngOnInit() {
  }

  onDownloadTemplate(){
    this.adminService
  }

}
