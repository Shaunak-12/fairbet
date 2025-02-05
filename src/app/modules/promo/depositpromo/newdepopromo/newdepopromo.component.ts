import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-newdepopromo',
  imports: [
    ModulesModule,
  ],
  templateUrl: './newdepopromo.component.html',
  styleUrl: './newdepopromo.component.scss'
})
export class NewdepopromoComponent implements OnInit {
  @Input() submitBtn!:boolean;
  @Input() tmpArr:any=[];
  @Input() levArr:any=[];
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  submitDisabled=false;
  resetBtn = true;
  addForm!: FormGroup;
  adminPass = '';
  catDrop=[{val:'Normal'},{val:'Slot'},{val:'Sports'},{val:'Live'},{val:'Jili'}];
  userWals:any=[];
  tmpOps:any=[];
  levOps:any=[];
  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }
  ngOnInit(){
    this.userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
    this.initializeForm();
    // let mGroup1 = this.tmpArr.find(wal => wal.WalletTypeId == this.addForm.get('WalletTypeId').getRawValue());
    // if(mGroup1&&('WalletwsList' in mGroup1)){
    //   this.tmpOps=mGroup1.WalletwsList.map(({ Id, Name }) => ({ name: Name, value: Id }));
    //   this.addForm.get('TemplateId').setValue(this.tmpOps[0].value);
    // }
    // else{
    //   this.tmpOps=[{value:'',name:'Select'}];
    //   this.addForm.get('TemplateId').setValue('');
    // }
    // let mLev1 = this.levArr.find(wal => wal.WalletTypeId == this.addForm.get('WalletTypeId').getRawValue());
    // if(mLev1&&('WalletwsList' in mLev1)){
    //   this.levOps=mLev1.WalletwsList.map(({ Id, Name }) => ({ name: Name, value: Id }));
    //   this.addForm.get('LevelId').setValue(this.levOps[0].value);
    // }
    // else{
    //   this.levOps=[{value:'',name:'Select'}];
    //   this.addForm.get('LevelId').setValue('');
    // }
    // this.addForm.get('WalletTypeId').valueChanges.subscribe(value => {
    //   let mGroup = this.tmpArr.find(wal => wal.WalletTypeId == value);
    //   if(mGroup&&('WalletwsList' in mGroup)){
    //     this.tmpOps=mGroup.WalletwsList.map(({ Id, Name }) => ({ name: Name, value: Id }));
    //     this.addForm.get('TemplateId').setValue(this.tmpOps[0].value);
    //   }
    //   else{
    //     this.tmpOps=[{value:'',name:'Select'}];
    //     this.addForm.get('TemplateId').setValue('');
    //   }
    //   let mLev = this.levArr.find(wal => wal.WalletTypeId == value);
    //   if(mLev&&('WalletwsList' in mLev)){
    //     this.levOps=mLev.WalletwsList.map(({ Id, Name }) => ({ name: Name, value: Id }));
    //     this.addForm.get('LevelId').setValue(this.levOps[0].value);
    //   }
    //   else{
    //     this.levOps=[{value:'',name:'Select'}];
    //     this.addForm.get('LevelId').setValue('');
    //   }
    // });
  }
  
  initializeForm(){
    this.addForm = this.formBuilder.group({
    DepositCount: ["", [Validators.required]],
    MinimumDepositAmount: ["", [Validators.required]],
    DepositAmount: ["", [Validators.required]],
    DepositPercentage: ["", [Validators.required]],
    CapLimit: ["", [Validators.required]],
    PromotionCode: ["", [Validators.required]],
    Title: ["", [Validators.required]],
    Description: ["", [Validators.required]],
    ExactDepositCount: ["", [Validators.required]],
    Wagering: ["", [Validators.required]],
    Category: [this.catDrop[0].val, [Validators.required]],
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
        this.apiservice.sendRequest(config['newDepoPromo'],FormValue,"newDepoPromo").subscribe((data: any) => {
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