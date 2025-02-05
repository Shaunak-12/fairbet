import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';

import moment from 'moment';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-editplayer-details',
  imports: [
    ModulesModule
  ],
  templateUrl: './editplayer-details.component.html',
  styleUrl: './editplayer-details.component.scss'
})
export class EditplayerDetailsComponent implements OnInit {
  @Input() userData:any;
  @Input() submitBtn!:boolean;
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  
  submitDisabled=false;
  todayDate = new Date();
  
  resetBtn = true;
  playerForm!: FormGroup;
  adminPass = '';

  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }

  ngOnInit(){
    console.log(this.userData);
    this.initializeForm();
  }
  
  initializeForm(){
    this.playerForm = this.formBuilder.group({
      UserId:[this.userData.UserId],
      UserName:[this.userData.UserName, [Validators.required]],
      FName:[this.userData.FName, [Validators.required]],
      LName:[this.userData.LName, [Validators.required]],
      DOB:[this.userData.DOB, [Validators.required]]
      });
  }
  
  onBack(){
    this.onCancel.emit();
  }
  
  onSubmit(){
    if(this.playerForm.invalid){
      this.utilities.toastMsg('warning','Please enter Required Data!','');
    }
    else{
      this.submitDisabled=true;
      let FormValue = this.playerForm.getRawValue();
      FormValue.DOB = moment(FormValue.DOB).format("yyyy-MM-DD");
        this.apiservice.sendRequest(config['editPlayerDetails'],FormValue).subscribe((data: any) => {
          this.submitDisabled=false;
          if (data.ErrorCode === "1") {
            this.utilities.toastMsg('success',"Success", data.ErrorMessage);
            this.adminPass=data.ErrorMessage;
            this.playerForm.disable();
            this.onCancel.emit();
          }
          else {
            this.utilities.toastMsg('warning',"Failed",data.Result + " : " + data.ErrorMessage);
          }
          this.onSave.emit();
        }, (error) => {
          console.log(error);
          this.utilities.toastMsg('warning',"Failed","Please try later");
          this.onCancel.emit();
        });
      
    }
  }
}