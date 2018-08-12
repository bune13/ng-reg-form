import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'

@Component({
  selector: 'app-admin-call',
  templateUrl: './admin-call.component.html',
  styleUrls: ['./admin-call.component.css']
})
export class AdminCallComponent implements OnInit {
  selectedFile:File = null;

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

    // this.adminService.onUploadFileDB();

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

  onFileSelected(e){
    this.selectedFile = e.target.files[0]
    console.log(this.selectedFile)
  }

  onUpload(){
    const fd = new FormData();
    fd.append('template', this.selectedFile, this.selectedFile.name)
    this.adminService.onUploadFileDB(fd).subscribe(
      (res)=>{
        console.log(res)
      });  
  }

}
