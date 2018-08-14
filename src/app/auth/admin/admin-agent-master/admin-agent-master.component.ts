import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'node_modules/ngx-bootstrap';
import { AdminService } from '../admin.service';
import { ApiService } from '../../../shared/api.service';

@Component({
  selector: 'app-admin-agent-master',
  templateUrl: './admin-agent-master.component.html',
  styleUrls: ['./admin-agent-master.component.css']
})
export class AdminAgentMasterComponent implements OnInit {
  userIsPresent:boolean;
  modalRef: BsModalRef;

  constructor(private adminService:AdminService, private modalService:BsModalService, private apiService:ApiService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onClick(){
    this.apiService.onCheckAuth();
  }
  findAgent(){
    this.adminService.onFindAgent().subscribe(
      (res)=>{
        this.userIsPresent = true;
      },
      (err)=>{
        this.userIsPresent = false;
      },
      ()=>{}
    );
  }

}
