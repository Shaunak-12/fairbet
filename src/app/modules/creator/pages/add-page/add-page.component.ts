import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-add-page',
  imports: [
    ModulesModule
  ],
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.scss'
})
export class AddPageComponent implements OnInit {
  @Input() submitBtn!:boolean;
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  
  submitDisabled=false;
  
  resetBtn = true;
  adminForm!: FormGroup;
  adminPass = '';

  fullURL = new FormControl('',Validators.required);

  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }

  ngOnInit(){
    this.initializeForm();
    this.fullURL.valueChanges.subscribe((value)=>{
      let handleCode = value!.match(/^https:\/\/www\.instagram\.com\/([^/?]+)/);
      this.adminForm.get('Handle')?.setValue(handleCode?handleCode[1]:'');
    });
  }
  
  initializeForm(){
    this.adminForm = this.formBuilder.group({
      Name: ["", [Validators.required]],
      Mobile: ["", [Validators.required,Validators.pattern('[6-9]\\d{9}')]],
      WesiteURL: [""],
      Password: ["", [Validators.required]],
      PageName: ["", [Validators.required]],
      Handle: ["", [Validators.required]],
      Type: ["Admin", [Validators.required]],
      SiteCode: [sessionStorage.getItem('selectedSite')]
      });
  }
  
  onBack(){
    this.onCancel.emit();
  }
  
  onSubmit(){
    if(this.adminForm.invalid){
      this.utilities.toastMsg('warning','Please enter Required Data!','');
    }
    else{
      this.submitDisabled=true;
      let FormValue = this.adminForm.getRawValue();
      if(!FormValue.id){
        delete FormValue.id;
        this.apiservice.sendRequest(config['saveCreatorPage'],FormValue).subscribe((data: any) => {
          // console.log(data);
          this.submitDisabled=false;
          if (data.ErrorCode === "1") {
            this.utilities.toastMsg('success',"Success", data.ErrorMessage);
            this.adminPass=data.ErrorMessage;
            this.adminForm.disable();
            this.onSave.emit();
          }
          else {
            this.utilities.toastMsg('warning',"Failed",data.Result + " : " + data.ErrorMessage);
          }
        }, (error) => {
          console.log(error);
        });
      }
    }
  }
}