import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModulesModule } from '@modules/modules/modules.module';
import { CommonFunctionService } from '@services/common-function.service';
import moment from 'moment';

@Component({
  selector: 'app-bank-details',
  imports: [
    ModulesModule
  ],
  templateUrl: './bank-details.component.html',
  styleUrl: './bank-details.component.scss'
})
export class BankDetailsComponent implements OnInit {
  
  @Input() userData:any;
  @Output() onCancel = new EventEmitter<any>();
  
  DataLoader=false;
  BankDataCollumns=[]
  BankDataRows:any=[];
  sSite=sessionStorage.getItem('selectedSite');
  
  constructor(private utilities:CommonFunctionService) { }
  
  ngOnInit(){
      this.BankDataRows=[
        [{value:'Account Number',bg:'white-cell'},{value:this.userData.AccountNumber,bg:'white-cell'}],
        [{value:'Amount',bg:'white-cell'},{value:this.utilities.roundOffNum(this.userData.AccountBalance),bg:'white-cell'}],
        [...(this.userData.BankName?[{value:'Bank Name	',bg:'white-cell'},{value:this.userData.BankName,bg:'white-cell'}]:[{value:'Wallet Name	',bg:'white-cell'},{value:this.userData.WalletName,bg:'white-cell'}])],
        [...(this.userData.BranchName?[{value:'Branch Name	',bg:'white-cell'},{value:this.userData.BranchName,bg:'white-cell'}]:[])],
        [{value:'Holder Name	',bg:'white-cell'},{value:this.userData.AccountHolderName,bg:'white-cell'}],
        [...(this.userData.IfscCode?[{value:'IFSC Code	',bg:'white-cell'},{value:this.userData.IfscCode,bg:'white-cell'}]:[])]
      ]
  }

  copytoclipboard() {
    let copiedDetail = "Account Number : "+this.userData.AccountNumber
    +"\nAmount : "+this.userData.AccountBalance
    +(this.userData.BankName?("\nBank Name : "+this.userData.BankName):("\nWallet Name : "+this.userData.WalletName))
    +(this.userData.BranchName?("\nBranch Name : "+this.userData.BranchName):'')
    +"\nHolder Name : "+this.userData.AccountHolderName
    +(this.userData.IfscCode?("\nIFSC Code : "+this.userData.IfscCode):'');
    navigator.clipboard.writeText(copiedDetail);
    this.utilities.toastMsg('success','Copied : ',copiedDetail);
  }
  
  onBack(){
    this.onCancel.emit();
  }
}