import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../admin.service';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http'
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-admin-call',
  templateUrl: './admin-call.component.html',
  styleUrls: ['./admin-call.component.css']
})
export class AdminCallComponent implements OnInit {
  selectedFile:File = null;
  uploadProgress:number;
  uploadProgressCompleted:string;
  showProgressBar:boolean = false;

  lists:any[];

  dataTable: any;

  constructor(private adminService:AdminService, private http: HttpClient, private router:Router, private httpClient: HttpClient, private chRef: ChangeDetectorRef) { }

  api_url:string = this.adminService.api_url
  downloadApiLink:string = this.api_url+"download_template"
  uploadApiLink:string = this.api_url+"upload"

  ngOnInit() {
  }

  onDownloadTemplate(){
    this.adminService.downloadTemplate();
  }

  onFileSelected(e){
    this.selectedFile = e.target.files[0]
    console.log(this.selectedFile)
  }

  onUpload(){
    
    const fd = new FormData();
    fd.append('template', this.selectedFile, this.selectedFile.name)
    this.httpClient.post(`${this.api_url}upload`, fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      (event)=>{
        this.showProgressBar = true;

        if(event.type === HttpEventType.UploadProgress){
          console.log('Upload Progress: ' + Math.round(event.loaded/event.total*100)+'%')
          this.uploadProgress = Math.round(event.loaded/event.total*100)
          this.uploadProgressCompleted = String(this.uploadProgress)+"%"
          if(this.uploadProgress == 100){
            this.uploadProgressCompleted = "Completed"
          }
          console.log(this.uploadProgress)
        } else if(event.type === HttpEventType.Response){
          console.log(event)
        }

        setTimeout(() => {
          this.showProgressBar = false;
        }, 2000);

        const table: any = $('table')
        table.destroy();

        this.adminService.getAllCallLists().subscribe(
          (data: any[]) => {
            //if list more than 1 show table
            // from python do get datatable
            this.lists = JSON.parse(data['result'])
            this.chRef.detectChanges()
            this.dataTable = table.DataTable()
          }
        );
      },
      (err)=>{
        if(err.status != 200){
          this.router.navigate(['/unauth'])
        }
      },
      ()=>{}
    );
  }

}
