import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-edit-rolloveramount',
  imports: [
    ModulesModule
  ],
  templateUrl: './edit-rolloveramount.component.html',
  styleUrl: './edit-rolloveramount.component.scss'
})
export class EditRolloveramountComponent implements OnInit {
	@Input() submitBtn!:boolean;
	@Input() userData:any;
	@Input() walId:any;
	@Input() rowDataIn:any;
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  
  submitDisabled=false;
  
  resetBtn = true;
  rolleditform!: FormGroup;
  rollPass = '';

  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }

  ngOnInit(){
    this.initializeForm();
    // console.log(this.userData);
  }
  
  initializeForm(){
    this.rolleditform = this.formBuilder.group({
      NormalRolloverAmount: [this.rowDataIn.NormalRolloverAmount, [Validators.required]],
      SlotsRolloverAmount: [this.rowDataIn.SlotsRolloverAmount, [Validators.required]],
      SportsRolloverAmount: [this.rowDataIn.SportsRolloverAmount, [Validators.required]],
      CrashRolloverAmount: [this.rowDataIn.CrashRolloverAmount, [Validators.required]],
      TableRolloverAmount: [this.rowDataIn.TableRolloverAmount, [Validators.required]],
      FishingRolloverAmount: [this.rowDataIn.FishingRolloverAmount, [Validators.required]],
      LiveRolloverAmount: [this.rowDataIn.LiveRolloverAmount, [Validators.required]],
      SiteCode: [sessionStorage.getItem('selectedSite')]
      });
  }
  
  onBack(){
    this.onCancel.emit();
  }
  
  onSubmit(){
    if(this.rolleditform.invalid){
      this.utilities.toastMsg('warning','Please enter Required Data!','');
    }
    else{
      this.submitDisabled=true;
      let FormValue = this.rolleditform.getRawValue();
      FormValue.WalletTypeId = this.walId;
      FormValue.UserId = this.userData.Id;
      if(!FormValue.id){
        delete FormValue.id;
        this.apiservice.sendRequest(config['rollOverupdate'],FormValue).subscribe((data: any) => {
          this.submitDisabled=false;
          if (data.ErrorCode === "1") {
            this.utilities.toastMsg('success',"Success", data.ErrorMessage);
            this.rollPass=data.ErrorMessage;
            this.rolleditform.disable();
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
