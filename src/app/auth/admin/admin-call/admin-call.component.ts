import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'

@Component({
  selector: 'app-admin-call',
  templateUrl: './admin-call.component.html',
  styleUrls: ['./admin-call.component.css']
})
export class AdminCallComponent implements OnInit {
  public progress: number;
  public message: string;

  constructor(private adminService:AdminService, private http: HttpClient) { }

  api_url:string = this.adminService.api_url
  downloadApiLink:string = this.api_url+"download_template"
  uploadApiLink:string = this.api_url+"upload"

  ngOnInit() {
  }

  onDownloadTemplate(){
    this.adminService.downloadTemplate();
  }

  upload(files) {

    this.adminService.onUploadFileDB(localStorage.getItem('id_token'));

    console.log("files data",files);
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    console.log("formdata",formData);
    const uploadReq = new HttpRequest('POST', this.uploadApiLink, formData, {
      reportProgress: true,
    });
    
  }

}
