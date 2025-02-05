import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-add-form-lev',
  imports: [
    ModulesModule
  ],
  templateUrl: './add-form-lev.component.html',
  styleUrl: './add-form-lev.component.scss'
})
export class AddFormLevComponent implements OnInit {
  @Input() submitBtn!:boolean;
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  
  submitDisabled=false;
  
  resetBtn = true;
  addForm!: FormGroup;
  adminPass = '';
  userWals:any=[];

  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }

  ngOnInit(){
    this.userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
    console.log(this.userWals);
    this.initializeForm();
  }
  
  initializeForm(){
    this.addForm = this.formBuilder.group({
      Name: ["", [Validators.required]],
      LevelNumber: ["", [Validators.required]],
      WalletTypeId: [parseInt(sessionStorage.getItem('WalChosen')||'{}')],
      SiteCode: [sessionStorage.getItem('selectedSite')]
      });
      console.log(this.addForm.getRawValue());
  }
  
  onBack(){
    this.onCancel.emit();
  }
  
  onSubmit(){
    if(this.addForm.invalid){
      this.utilities.toastMsg('warning','Please enter Required Data!','');
    }
    else{
      this.submitDisabled=true;
      let FormValue = this.addForm.getRawValue();
      if(!FormValue.id){
        delete FormValue.id;
        this.apiservice.sendRequest(config['newLevMst'],FormValue,"newLevMst").subscribe((data: any) => {
          this.submitDisabled=false;
          if (data.ErrorCode === "1") {
            this.utilities.toastMsg('success',"Success", data.ErrorMessage);
            this.adminPass=data.ErrorMessage;
            this.addForm.disable();
            this.onCancel.emit();
          }
          else {
            this.utilities.toastMsg('warning',"Failed",data.Result + " : " + data.ErrorMessage);
          }
          this.onSave.emit();
        }, (error) => {
          console.log(error);
        });
      }
    }
  }
}