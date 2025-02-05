import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-online-deposit-withdraw',
  imports: [
    ModulesModule
  ],
  templateUrl: './online-deposit-withdraw.component.html',
  styleUrl: './online-deposit-withdraw.component.scss'
})
export class OnlineDepositWithdrawComponent implements OnInit {
  @Input() submitBtn!:boolean;
  @Input() isCredit=false;
  @Input() hasIMPS=1;
  @Input() walId=sessionStorage.getItem('WalChosen');
  @Input() userData:any;
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  
  submitDisabled=false;
  
  resetBtn = true;
  adminForm!: FormGroup;
  trxMsg = '';
  modeBonus=false;
  PercentBonus = new FormControl(0);
  totalDeposit = {display:'0',amount:0};
  wageringAmount = {display:'0',amount:0};
  
  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }
  
  ngOnInit(){
    this.initializeForm();
    this.adminForm.get('BonusCheck')?.valueChanges.subscribe((value) => {
      if(value && (!this.adminForm.get('BonusCheck')?.disabled))
      {
        this.adminForm.controls['TransactionAmount'].disable();
        this.adminForm.controls['TransactionAmount'].setValue("");
        this.modeBonus=true;
      }
      else if(!this.adminForm.get('BonusCheck')?.disabled)
      {
        this.adminForm.controls['TransactionAmount'].enable();
        this.modeBonus=false;
      }
    })

    this.adminForm.get('BonusAmount')?.valueChanges.subscribe((value) => {
      this.calcTotalDeposit();
      this.calWageringAmount();
    });
    this.PercentBonus.valueChanges.subscribe((value) => {
      this.calcTotalDeposit();
      this.calWageringAmount();
    });
    this.adminForm.get('BonusConditionValue')?.valueChanges.subscribe((value) => {
      this.calcTotalDeposit();
      this.calWageringAmount();
    });
    this.adminForm.get('BonusCondition')?.valueChanges.subscribe((value) => {
      this.calcTotalDeposit();
      this.calWageringAmount();
    });
  }

  calcTotalDeposit(){
    this.totalDeposit.amount = this.adminForm.controls['BonusAmount'].value! * (this.adminForm.get('BonusCondition')?.getRawValue() == 1 ? (this.PercentBonus.getRawValue()! / 100) : 1);
    this.totalDeposit.display = this.utilities.roundOffNum(this.totalDeposit.amount);
  }
  calWageringAmount(){
    this.wageringAmount.amount = ((this.adminForm.get('BonusCondition')?.getRawValue()==1?this.totalDeposit.amount:0)+this.adminForm.controls['BonusAmount'].value)*this.adminForm.controls['BonusConditionValue'].value;
    this.wageringAmount.display = this.utilities.roundOffNum(this.wageringAmount.amount);
  }
  
  initializeForm(){
    this.adminForm = this.formBuilder.group({
      TransactionType: [this.isCredit?"CREDIT":"DEBIT"],
      TransactionAmount: [""],
      TransactionId:[""],
      Description: ["",Validators.required],
      UserId: [this.userData.Id],
      BonusCheck: true,
      BonusAmount:[""],
      BonusCondition:[""],
      BonusConditionValue:[""],
      WalletTypeId:[this.walId]
    });
    if(this.isCredit){
      this.modeBonus=true;
    }
  }
  
  onBack(){
    this.onCancel.emit();
  }
  
  onSubmit(){
    if(this.adminForm.invalid){
      this.utilities.toastMsg('warning','Please enter valid Data!','');
      return;
    }
    else{
      this.submitDisabled=true;
      let FormValue = this.adminForm.getRawValue();
      if(FormValue.TransactionType=='CREDIT' && !FormValue.BonusCheck){
        if(!FormValue.TransactionAmount){
          this.utilities.toastMsg('warning',"Please select Bonus Amount!",'');
          this.submitDisabled=false;
          return;
        }
        delete FormValue.BonusAmount;
        delete FormValue.BonusCondition;
        delete FormValue.BonusConditionValue;
      }
      else if(FormValue.TransactionType=='CREDIT' && FormValue.BonusCheck ){
        FormValue.TransactionAmount=this.totalDeposit.amount;
        if(!FormValue.TransactionAmount){
          this.utilities.toastMsg('warning',"Please select Bonus Amount!",'');
          this.submitDisabled=false;
          return;
        }
        if(FormValue.BonusCondition!=1&&FormValue.BonusCondition!=2){
          this.utilities.toastMsg('warning',"Please select Bonus Type!",'');
          this.submitDisabled=false;
          return;
        }
        delete FormValue.TransactionId;
        FormValue.TransactionAmount=this.totalDeposit.amount;
      }
      else if(FormValue.TransactionType=='DEBIT'){
        if(!FormValue.TransactionAmount){
          this.utilities.toastMsg('warning',"Please select Amount!",'');
          this.submitDisabled=false;
          return;
        }
        delete FormValue.BonusCheck;
        delete FormValue.BonusAmount;
        delete FormValue.BonusCondition;
        delete FormValue.BonusConditionValue;
      }
      this.apiservice.sendRequest(config['updateUserAccount'],FormValue).subscribe((data: any) => {
        this.submitDisabled=false;
        if (data.ErrorCode === "1") {
          this.utilities.toastMsg('success',"Success", data.ErrorMessage);
          this.trxMsg = data.ErrorMessage;
          setTimeout(()=>{
            this.onCancel.emit();
            this.onSave.emit();
        }, 2000);
        }
        else {
          this.utilities.toastMsg('warning',"Failed",data.Result + " : " + data.ErrorMessage);
          this.onSave.emit();
        }
      }, (error) => {
        console.log(error);
      });
    }
  }
}