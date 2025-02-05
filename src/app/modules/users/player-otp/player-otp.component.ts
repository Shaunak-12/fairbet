import { Component, OnInit, OnDestroy } from '@angular/core';
import moment from 'moment';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { CommonFunctionService } from '@services/common-function.service';
import { Subscription } from 'rxjs';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-player-otp',
  imports: [
    ModulesModule
  ],
  templateUrl: './player-otp.component.html',
  styleUrl: './player-otp.component.scss'
})
export class PlayerOtpComponent implements OnInit, OnDestroy {
  todayDate = new Date();
  dateValue: any=[new Date(),new Date()];
  
  buttonData=[{name:'Export',disabled:true,value:'export'}];
  
  rUsersCollumns:any = [];

  rUsersCollumnHeaders:any = [
    [
      {value:'Sr. No.',bg:'white-drop'},
      {value:'UserName',bg:'white-drop'},
      {value:'Mobile',bg:'white-drop'},
      {value:'IpAddress',bg:'white-drop'},
      {value:'OTP',bg:'white-drop'},
      {value:'OTPDateTime',bg:'white-drop'}
    ]
  ];
  
  rUsersData: { TotalCount: number; UserName: string; Mobile: string; IpAddress: string; OTP: string; OTPDateTime: string; CreatedDateTZ?: string; UserId: string; }[] = [];
  rUsersRows: { value: any; bg: string; icon?: string }[][] = [];
  
  pageNo=1;
  rowCount: any ={f:0,l:0,t:0};
  pageCount=[10,50,100,500,1000];
  pagesTotal=1;
  paginatorBlock:any=[];
  
  currentQuery = {"Dates":[this.dateValue[0],this.dateValue[1]],"Search": "","PageNo": 1,"PageSize": this.pageCount[0],"SiteCode":sessionStorage.getItem('selectedSite')};
  
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[]=[];
  apiLoader={udl_list:false,udl_export:false};
  constructor(private apiservice :ApiService, private utilities : CommonFunctionService) { }
  
  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.apiLoader.udl_list=('getallotpList' in loading)?true:false;
      // this.apiLoader.udl_export=('downloadUserDepositList' in loading)?true:false;
    });
    this.GetRegisteredUsers(this.currentQuery);
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
  
  searchRegistered(searchQuery:any){
    this.currentQuery.Dates=searchQuery.Dates;
    this.currentQuery.PageNo = 1;
    this.currentQuery.Search = searchQuery.searchInput;
    this.GetRegisteredUsers(this.currentQuery);
  }
  
  onPaginatorChange(paginatorQuery:any){
    if(paginatorQuery.action=='next'){
      this.currentQuery.PageNo = this.currentQuery.PageNo+1;
    }
    else if(paginatorQuery.action=='previous'){
      this.currentQuery.PageNo = this.currentQuery.PageNo-1;
    }
    else if(paginatorQuery.action=='pageSize'){
      this.currentQuery.PageNo = 1;
      this.currentQuery.PageSize = paginatorQuery.pageSize;
    }
    else if(paginatorQuery.action=='pageNo'){
      this.currentQuery.PageNo = paginatorQuery.pageNo;
    }
    this.GetRegisteredUsers(this.currentQuery);
  }
  
  GetRegisteredUsers(searchQuery:any){
    console.log(searchQuery);
    let request = {
      "StartDateTime": moment(searchQuery.Dates[0]).format("MM-DD-yyyy"),
      "EndDateTime": moment(searchQuery.Dates[1]).format("MM-DD-yyyy"),
      "PageNo": searchQuery.PageNo,
      "PageSize": searchQuery.PageSize,
      "SiteCode": searchQuery.SiteCode,
      "Search":searchQuery.Search
    };
    this.rUsersRows=[];
    this.rUsersCollumns=[];
    this.pagesTotal=1;
    this.buttonData[0].disabled=true;
    this.rUsersData=[];
    this.apiSubscriber[0] = this.apiservice.sendRequest(config['getallotpList'], request,'getallotpList').subscribe((data: any) => {
      this.currentQuery=searchQuery;
      this.rUsersData=data;
      if(this.rUsersData[0]){
        this.buttonData[0].disabled=false;
        this.rUsersCollumns=this.rUsersCollumnHeaders;
        this.pagesTotal=Math.ceil(this.rUsersData[0].TotalCount/searchQuery.PageSize);
        this.rUsersData.forEach((element:any,index:any) => {
          let ctz = element.CreatedDateTZ?" "+element.CreatedDateTZ:'';
          this.rUsersRows.push([
            {value:((this.currentQuery.PageNo-1)*this.currentQuery.PageSize)+(index+1),bg:'white-cell'},
            {value:element.UserName,bg:'white-cell'},
            {value:element.Mobile,bg:'white-cell'},
            {value:element.IpAddress,bg:'white-cell'},
            {value:element.OTP,bg:'white-cell'},
            {value:element.OTPDateTime?moment(element.OTPDateTime).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
            {value:'',bg:'white-cell',icon:'View'}
          ])
        });
        this.rowCount={f:this.rUsersRows[0][0].value,l:this.rUsersRows[this.rUsersRows.length-1][0].value,t:this.rUsersData[0].TotalCount};
        this.setPaginator();
      }
      else{
        this.rowCount={f:0,l:0,t:0};
        this.rUsersCollumns=this.utilities.TableDataNone;
      }      
    }, (error) => {
      console.log(error);
    });
  }

  onValueChange(formVal:any){
    if(formVal.type=='View'){
      window.open('/users/playerdetailview/'+this.rUsersData[formVal.row].UserId, '_blank');
    }
  }
  
  DownloadRegisteredUsersData() {
    let d1 = (moment(this.currentQuery.Dates[0]).format("DD/MM/yyyy HH:mm"));
    let d2 = (moment(this.currentQuery.Dates[1]).format("DD/MM/yyyy HH:mm"));
    let request = "?StartDateTime=" + d1 + "&EndDateTime=" + d2 + '&SiteCode='+sessionStorage.getItem('selectedSite');
    let docname = 'UserDeposit_Report_'+moment(this.currentQuery.Dates[0]).format("DD/MM/yyyy");
    this.apiservice.exportExcel(config['downloadUserDepositList'] + request,docname,'downloadUserDepositList');
  }

  ngOnDestroy(): void {
    if (this.loaderSubscriber) {
      this.loaderSubscriber.unsubscribe();
    }
    if(this.apiSubscriber[0]) {
      this.apiSubscriber[0].unsubscribe();
    }
  }
}