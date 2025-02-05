import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-editlevtempconf',
  imports: [
    ModulesModule
  ],
  templateUrl: './editlevtempconf.component.html',
  styleUrl: './editlevtempconf.component.scss'
})
export class EditlevtempconfComponent implements OnInit {
  @Input() levtempData:any;
  @Input() submitBtn!:boolean;
  @Input() tmpArr:any=[];
  @Input() levArr:any=[];
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
    console.log(this.levtempData);
    this.userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
    this.initializeForm();
  }
  
  initializeForm(){
    this.addForm = this.formBuilder.group({
      Id:[this.levtempData.Id],
      WalletTypeId:[this.levtempData.WalletTypeId],
      SiteCode:[sessionStorage.getItem('selectedSite')],
      DepositAmtCriteria: [this.levtempData.DepositAmtCriteria],
      BetAmtCriteria: [this.levtempData.BetAmtCriteria, [Validators.required]],
      BetTurnoverWegring: [this.levtempData.BetTurnoverWegring, [Validators.required]],
      DailyReward: [this.levtempData.DailyReward, [Validators.required]],
      WeeklyReward: [this.levtempData.WeeklyReward, [Validators.required]],
      MonthlyReward: [this.levtempData.MonthlyReward, [Validators.required]],
      UpgradeReward: [this.levtempData.UpgradeReward, [Validators.required]],
      DepositWithdrawalTurnoverWegering: [this.levtempData.DepositWithdrawalTurnoverWegering, [Validators.required]],
      WithdrawalTurnoverWegering: [this.levtempData.WithdrawalTurnoverWegering, [Validators.required]],
      DayFreq: [this.levtempData.DayFreq, [Validators.required]],
      WeekFreq: [this.levtempData.WeekFreq, [Validators.required]],
      MonthFreq :[this.levtempData.MonthFreq, [Validators.required]],
      DailyDepositAmount: [this.levtempData.DailyDepositAmount, [Validators.required]],
      WeeklyDepositAmount: [this.levtempData.WeeklyDepositAmount, [Validators.required]],
      MonthlyDepositAmount :[this.levtempData.MonthlyDepositAmount, [Validators.required]],
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
        this.apiservice.sendRequest(config['setLevTmpMap'],FormValue,"setLevTmpMap").subscribe((data: any) => {
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
