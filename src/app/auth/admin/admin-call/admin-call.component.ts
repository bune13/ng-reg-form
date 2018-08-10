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
  regForm:FormGroup;
  public progress: number;
  public message: string;

  constructor(private adminService:AdminService, private http: HttpClient) { }

  ngOnInit() {
    this.regForm = new FormGroup({
      'file_name': new FormControl(null, Validators.required),
    })
  }

  onDownloadTemplate(){
    // this.adminService.downloadTemplate();
  }

  onSubmit(){
    if(this.regForm.valid){
      console.log(this.regForm.value);
      // this.adminService.onUploadFile(this.regForm.value);
    }
  }

  upload(files) {
    console.log("files data",files);
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

      console.log("formdata",formData);
    const uploadReq = new HttpRequest('POST', `http://192.168.0.175:5000/upload`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }

}
