import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-change-status',
  imports: [
    ModulesModule
  ],
  templateUrl: './change-status.component.html',
  styleUrl: './change-status.component.scss'
})
export class ChangeStatusComponent implements OnInit {
  @Input() userData:any;
  @Input() userWal:any;
  @Output() onSave = new EventEmitter<any>();
    
  submitDisabled=false;
  adminForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }
  
  ngOnInit(){
    // console.log(this.rowData);
    this.initializeForm();
  }
  
  initializeForm(){
    this.adminForm = this.formBuilder.group({
      Remarks: [""],
      Id: [this.userData.Id],
    });
  }
  
  onSubmit(){
    if(this.adminForm.get('Remarks')?.getRawValue()==''){
      this.utilities.toastMsg('warning',"Please enter Description",'');
      return;
    }
    this.submitDisabled=true;
    this.apiservice.sendRequest(config['userCallBackStatus'],this.adminForm.getRawValue(),'userCallBackStatus').subscribe((data: any) => {
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
