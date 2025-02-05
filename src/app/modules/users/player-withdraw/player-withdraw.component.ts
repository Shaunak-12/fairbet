import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-player-withdraw',
  imports: [
    ModulesModule
  ],
  templateUrl: './player-withdraw.component.html',
  styleUrl: './player-withdraw.component.scss'
})
export class PlayerWithdrawComponent implements OnInit {
  @Input() userId!:number;
  @Input() uWalId:any;
  AllUserinfo:any=[];
  UserinfoData:any=[];
  rowCount: any={f:0,l:0,t:0};
  pagesTotal=1;
  paginatorBlock:any=[];
  dynamicControls = [{placeholder:'Search',type:'text',label:'Search'}];
  UserCollumnHeaders:any = [
    [{value:'Sr. No.',bg:'white-drop'},{value:'Amount',bg:'white-drop'},{value:'Status',bg:'white-drop'},
    {value:'Description',bg:'white-drop'},{value:'Date',bg:'white-drop'},{value:'Update Date',bg:'white-drop'}]
  ]  
  UserDataCollumns=this.UserCollumnHeaders;
  currentQuery: any ={"PageNo": 1,"PageSize":10};
  currentWal = sessionStorage.getItem('WalChosen');
  UserCollumnLoading = false;
  UserStatList: any = [];
  ButtonCount: any = [];
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentWal=this.uWalId;
    this.GetUserStatement(this.currentWal);
  }

  initializeData()
  {
    this.UserCollumnLoading = true;
    this.AllUserinfo = [];
    this.UserinfoData = [];
  }
  
  GetUserStatement(userselWal: any) {
    this.initializeData();
    this.currentWal=userselWal;
    let param = "?PageNo=" + this.currentQuery.PageNo + "&UserId=" + this.userId+'&WalletTypeId='+userselWal;
    this.UserCollumnLoading=true;
    this.apiservice.getRequest(config['getUserWithdrawal'] + param).subscribe((data: any) => {
      this.UserCollumnLoading = false;
      this.AllUserinfo=data;
      if(this.AllUserinfo[0]){
        this.UserDataCollumns=this.UserCollumnHeaders;
        this.pagesTotal=Math.ceil(this.AllUserinfo[0].TotalCount/this.currentQuery.PageSize);
        this.AllUserinfo.forEach((element:any,index:any) => {
          let ctz = element.CreatedDateTZ?" "+element.CreatedDateTZ:'';
          let utz = element.UpdatedDateTZ?" "+element.UpdatedDateTZ:'';
          this.UserinfoData.push([
          {value:((this.currentQuery.PageNo-1)*this.currentQuery.PageSize)+(index+1),bg:'white-cell'},
          {value:element.AccountBalance,bg:'white-cell'},
          {value:element.StatusName,bg:'white-cell'},
          {value:(element.UTRNumber?element.UTRNumber:'')+' '+(element.Description!=element.UTRNumber?(element.Description?element.Description:''):''),bg:'white-cell'},
          {value:element.CreatedDate?moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
          {value:element.UpdatedDate?moment(element.UpdatedDate).format("h:mm:ss A, DD-MMM-yyyy")+utz:'',bg:'white-cell'}
          ])
        });
        this.rowCount={f:this.UserinfoData[0][0].value,l:this.UserinfoData[this.UserinfoData.length-1][0].value,t:this.AllUserinfo[0].TotalCount};
        this.setPaginator();
      }
      else{
        this.rowCount={f:0,l:0,t:0};
        this.UserDataCollumns=this.utilities.TableDataNone;
      }
    }, (error) => {
      this.UserCollumnLoading = false;
    });
  }

  onPaginatorChange(paginatorQuery:any){
    if(paginatorQuery.action=='pageSize'){
      this.currentQuery.PageNo = 1;
      this.currentQuery.PageSize = paginatorQuery.pageSize;
    }
    else if(paginatorQuery.action=='pageNo'){
      this.currentQuery.PageNo = paginatorQuery.pageNo;
    }
    this.GetUserStatement(this.currentWal);
  }

  setPaginator(){
    this.paginatorBlock = [];
    if (this.currentQuery.PageNo <= 4) {
      for (let i = 1; i <= 10 && i <= this.pagesTotal; i++) {
        this.paginatorBlock.push(i);
      }
    }
    else {
      for (let i = this.currentQuery.PageNo - 3; i <= this.currentQuery.PageNo + 6 && i <= this.pagesTotal; i++) {
        this.paginatorBlock.push(i);
      }
    }
  }

  ChangePageNumber(event: any) {
    this.currentQuery.PageNo = (event.pageIndex + 1);
    this.currentQuery.PageSize = event.pageSize;
    this.GetUserStatement(this.currentWal);
  }
}