import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-add-form-temp',
  imports: [
    ModulesModule,
  ],
  templateUrl: './add-form-temp.component.html',
  styleUrl: './add-form-temp.component.scss'
})
export class AddFormTempComponent implements OnInit {
  @Input() submitBtn!:boolean;
  @Input() groupArr:any=[];
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  
  submitDisabled=false;
  
  resetBtn = true;
  addForm!: FormGroup;
  adminPass = '';
  userWals:any=[];
  defGrp:any=[];
  grpOps:any=[];

  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }

  ngOnInit(){
    this.userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
    this.initializeForm();
    let mGroup1 = this.groupArr.find((wal: { WalletTypeId: any; }) => wal.WalletTypeId == this.addForm.get('WalletTypeId')?.getRawValue());
    if(mGroup1&&('WalletwsList' in mGroup1)){
      this.grpOps=mGroup1.WalletwsList.map(({ Id, Name }:{ Id:any; Name:any; }) => ({ name: Name, value: Id }));
      this.addForm.get('GroupId')?.setValue(this.grpOps[0].value);
    }
    else{
      this.grpOps=[];
      this.addForm.get('GroupId')?.setValue('');
    }
    this.addForm.get('WalletTypeId')?.valueChanges.subscribe(value => {
      let mGroup = this.groupArr.find((wal: { WalletTypeId: any; }) => wal.WalletTypeId == value);
      if(mGroup&&('WalletwsList' in mGroup)){
        this.grpOps=mGroup.WalletwsList.map(({ Id, Name }:{ Id:any; Name: any;}) => ({ name: Name, value: Id }));
        this.addForm.get('GroupId')?.setValue(this.grpOps[0].value);
      }
      else{
        this.grpOps=[];
        this.addForm.get('GroupId')?.setValue('');
      }
		});
  }
  
  initializeForm(){
    this.addForm = this.formBuilder.group({
      Name: ["", [Validators.required]],
      WalletTypeId: [parseInt(sessionStorage.getItem('WalChosen')||'{}')],
      SiteCode: [sessionStorage.getItem('selectedSite')],
      GroupId :['']
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
        this.apiservice.sendRequest(config['newTempMst'],FormValue,"newTempMst").subscribe((data: any) => {
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