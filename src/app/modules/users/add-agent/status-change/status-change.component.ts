import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-status-change',
  imports: [
    ModulesModule
  ],
  templateUrl: './status-change.component.html',
  styleUrl: './status-change.component.scss'
})
export class StatusChangeComponent implements OnInit {
  @Input() userData:any;
  @Output() onSave = new EventEmitter<any>();
    
  submitDisabled=false;
  adminForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }
  
  ngOnInit(){
    this.initializeForm();
  }
  
  initializeForm(){
    this.adminForm = this.formBuilder.group({
      Remark: [""],
      Id: [this.userData.Id],
      VerificationStatus:[this.userData.customStatus]
    });
  }
  
  onSubmit(){
    if(this.adminForm.get('Remark')?.getRawValue()==''){
      this.utilities.toastMsg('warning',"Please enter Description",'');
      return;
    }
    this.submitDisabled=true;
    this.apiservice.sendRequest(config['updateStatus'],this.adminForm.getRawValue(),'updateStatus').subscribe((data: any) => {
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
