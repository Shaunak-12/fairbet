import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-analytics',
  imports: [
    ModulesModule,

  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent implements OnInit {
  todayDate = new Date();
  startEnd1: Date[]=[new Date,new Date];
  startEnd2: Date[]=[new Date,new Date];
  depositData: any = [];
  WithdrawalData: any = [];
  depositDataCollumns= ['Sr. No.','Name','User Name','Percentage','Deposit'];
  rowCount={f:0,l:0,t:0};
  withdrawDataCollumns= ['Sr. No.','Name','User Name','Percentage','Withdraw'];

  analyticsLoading = [false,false];
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[]=[];
  constructor(private apiservice: ApiService,private utilities: CommonFunctionService) { }

  ngOnInit(): void {
    // this.GetTopDepositors(this.startEnd1);
  }

  GetTopDepositors(DateValues:Date[]) {
    let request = {
      "StartDateTime": moment(DateValues[0]).format("MM-DD-yyyy"),
      "EndDateTime": moment(DateValues[1]).format("MM-DD-yyyy")
    };
    this.depositData=[];
    this.apiservice.sendRequest(config['GetTopDepositors'], request).subscribe((data: any) => {
      let DataDeposit = data;
      if(DataDeposit[0]){
        DataDeposit.forEach((element:any,index:any) => {
          this.depositData.push([
            {value:index+1,bg:'white-drop'},
            {value:element.FName,bg:'white-drop'},
            {value:element.UserName,bg:'white-drop'},
            {value:element.DepositPercentage+' %',bg:'white-drop'},
            {value:element.DepositAmount,bg:'white-drop'}
          ])
        });
        // console.log(this.depositData);
        this.rowCount={f:this.depositData[0][0].value,l:this.depositData[this.depositData.length-1][0].value,t:this.depositData[0].TotalCount};
      }
      else{
        this.rowCount={f:0,l:0,t:0};
        this.depositData=this.utilities.TableDataNone;
      }
    }, (error: any) => {
      console.log(error);
    });
  }

}
