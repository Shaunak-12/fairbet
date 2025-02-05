import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-add-form-tfc',
  imports: [
    ModulesModule
  ],
  templateUrl: './add-form-tfc.component.html',
  styleUrl: './add-form-tfc.component.scss'
})
export class AddFormTfcComponent implements OnInit {
  @Input() submitBtn!:boolean;
  @Input() tmpArr:any=[];
  @Input() feaArr:any=[];
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  submitDisabled=false;
  resetBtn = true;
  addForm!: FormGroup;
  adminPass = '';
  userWals:any=[];
  tmpOps:any=[];
  levOps:any=[];

  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }

  ngOnInit(){
    console.log(this.feaArr);
    this.userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
    this.initializeForm();
    let mGroup1 = this.tmpArr.find((wal: { WalletTypeId: any; }) => wal.WalletTypeId == this.addForm.get('WalletTypeId')?.getRawValue());
    if(mGroup1&&('WalletwsList' in mGroup1)){
      this.tmpOps=mGroup1.WalletwsList.map(({ Id, Name }:{ Id:any; Name: any; }) => ({ name: Name, value: Id }));
      this.addForm.get('TemplateId')?.setValue(this.tmpOps[0].value);
    }
    else{
      this.tmpOps=[{value:'',name:'Select'}];
      this.addForm.get('TemplateId')?.setValue('');
    }
    this.addForm.get('WalletTypeId')?.valueChanges.subscribe(value => {
      let mGroup = this.tmpArr.find((wal: { WalletTypeId: any; }) => wal.WalletTypeId == value);
      if(mGroup&&('WalletwsList' in mGroup)){
        this.tmpOps=mGroup.WalletwsList.map(({ Id, Name }:{ Id:any; Name:any; }) => ({ name: Name, value: Id }));
        this.addForm.get('TemplateId')?.setValue(this.tmpOps[0].value);
      }
      else{
        this.tmpOps=[{value:'',name:'Select'}];
        this.addForm.get('TemplateId')?.setValue('');
      }
    });
  }
  
  initializeForm(){
    this.addForm = this.formBuilder.group({
      GroupId: ["1", [Validators.required]],
      TemplateId: ["", [Validators.required]],
      FeaturesId: ["", [Validators.required]],
      WalletTypeId: [parseInt(sessionStorage.getItem('WalChosen')||'{}')],
      SiteCode: [sessionStorage.getItem('selectedSite')],
    });
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
        this.apiservice.sendRequest(config['newTmpFeatMap'],FormValue,"newTmpFeatMap").subscribe((data: any) => {
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