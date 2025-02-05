import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-approve-details',
  imports: [
    ModulesModule
  ],
  templateUrl: './approve-details.component.html',
  styleUrl: './approve-details.component.scss'
})
export class ApproveDetailsComponent implements OnInit {

  @Input() userData:any;
  @Input() AcceptRejectVar='A';
  @Output() onCancel = new EventEmitter<any>();

  DataLoader=false;
  BankDataCollumns=[]
  BankDataRows:any=[];
  UTRNumber=new FormControl('',Validators.required);
  Description=new FormControl('',Validators.required);

  approveDisabled=false;
  trxdisabled=false;

  constructor(private apiservice: ApiService, private utilities : CommonFunctionService) { }

  ngOnInit(){
    // console.log(this.userData);
    this.BankDataRows=[
    [{value:'Account Number',bg:'white-cell'},{value:this.userData.AccountNumber,bg:'white-cell'}],
    [{value:'Bank Name',bg:'white-cell'},{value:this.userData.BankName,bg:'white-cell'}],
    [{value:'Branch Name',bg:'white-cell'},{value:this.userData.BranchName,bg:'white-cell'}],
    [{value:'Holder Name',bg:'white-cell'},{value:this.userData.AccountHolderName,bg:'white-cell'}],
    [{value:'IFSC Code',bg:'white-cell'},{value:this.userData.IfscCode,bg:'white-cell'}]
    ]
  }

  onBack(){
    this.onCancel.emit();
  }

  onTransfer(){
    let param = {Id:this.userData.Id}
    this.trxdisabled=true;
    this.apiservice.sendRequest(config['transferFundViaPayconnect'],param).subscribe((data: any) => {
      this.trxdisabled=false;
      if (data.ErrorCode == "1") {
        this.utilities.toastMsg('success',data.Result, data.ErrorMessage);
      }
      else {
        this.utilities.toastMsg('warning',data.Result,data.ErrorMessage);
      }
    }, (error) => {
      this.trxdisabled=false;
      console.log(error);
    });
  }

  onApprove(){
    if(this.AcceptRejectVar == 'A' && !this.UTRNumber.value){
      this.utilities.toastMsg('error',"Please Fill UTR Number","");
      return;
    }
    if(this.AcceptRejectVar == 'R' && !this.Description.value){
      this.utilities.toastMsg('error',"Please Fill Description","");
      return;
    }
    let param = {Id:this.userData.Id,StatusCode:(this.AcceptRejectVar=='A'?"A":"R"),Description:this.Description.value,UTRNumber:this.UTRNumber.value};
    this.approveDisabled=true;
    this.apiservice.sendRequest(config['approveWithdrawal'],param).subscribe((data: any) => {
      this.approveDisabled=false;
      if (data.ErrorCode == "1") {
        this.utilities.toastMsg('success',data.Result, data.ErrorMessage);
        this.onBack();
      }
      else {
        this.utilities.toastMsg('warning',data.Result,data.ErrorMessage);
        
      }
    }, (error) => {
      this.approveDisabled=false;
      console.log(error);
    });
    


  }
}