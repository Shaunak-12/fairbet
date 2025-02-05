import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-update-user',
  imports: [
    ModulesModule,
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit {
  @Input() userData:any;
  @Input() userWal:any;
  @Output() onSave = new EventEmitter<any>();
    
  submitDisabled=false;
  adminForm!: FormGroup;
  adminData:any = [];
  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }
  
  ngOnInit(){
    // console.log(this.rowData);
    this.initializeForm();
    this.GetAllAdmin();
  }
  
  initializeForm(){
    this.adminForm = this.formBuilder.group({
      SupportAdminId: [""],
      Mobile:[this.userData.tempMobile],
      Id:[this.userData.UserId]
    });
  }
  GetAllAdmin(){
    this.apiservice.getRequest(config['getAllAdminList'],'getAllAdminList').subscribe({
      next:(data)=>{
        this.adminData= data
        // console.log(this.adminData)
      },
      error(err) {
        console.error('Error:', err);
      },
    });
  }
  onSubmit(){
    if(this.adminForm.get('SupportAdminId')?.getRawValue()==''){
      this.utilities.toastMsg('warning',"Please select Admin",'');
      return;
    }
    this.submitDisabled=true;
    this.apiservice.sendRequest(config['updateLead'],this.adminForm.getRawValue(),'updateLead').subscribe((data: any) => {
      this.submitDisabled=false;
      if (data.ErrorCode === "1") {
        this.utilities.toastMsg('success',"Success", data.ErrorMessage);
        setTimeout(()=>{
          this.onSave.emit();
        }, 1000);
      }
      else {
        this.utilities.toastMsg('warning',"Failed",data.Result + " : " + data.ErrorMessage);
      }
    }, (error) => {
      console.log(error);
    });
  }

}
