import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-new-users-complete',
  imports: [
    ModulesModule
  ],
  templateUrl: './new-users-complete.component.html',
  styleUrl: './new-users-complete.component.scss'
})
export class NewUsersCompleteComponent implements OnInit {
  @Input() rowData:any;
    @Output() onSave = new EventEmitter<any>();
    
    submitDisabled=false;
    adminForm!: FormGroup;
    
    constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }
    
    ngOnInit(){
      console.log(this.rowData);
      this.initializeForm();
    }
  
    initializeForm(){
      this.adminForm = this.formBuilder.group({
        Description: [""],
        UserId: [this.rowData.UserId]
        // Id: [Number(this.rowData.UserId)]
  
      });
    }
    
    onSubmit(){
      if(this.adminForm.get('Description')?.getRawValue()==''){
        this.utilities.toastMsg('warning',"Please enter Description",'');
        return;
      }
      this.submitDisabled=true;
      this.apiservice.sendRequest(config['SaveFirstCallConversation'],this.adminForm.getRawValue()).subscribe((data: any) => {
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