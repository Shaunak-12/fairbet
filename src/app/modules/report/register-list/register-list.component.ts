import { Component, OnInit, OnDestroy } from '@angular/core';
import moment from 'moment';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { CommonFunctionService } from '@services/common-function.service';
import { Subscription } from 'rxjs';
import { ModulesModule } from '@modules/modules/modules.module';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-register-list',
  imports: [
    // ModulesModule
    SharedModule
  ],
  templateUrl: './register-list.component.html',
  styleUrl: './register-list.component.scss'
})
export class RegisterListComponent {
  // todayDate = new Date();
  // dateValue: any=[new Date(),new Date()];
  // exportLoader = false;
  
  // buttonData=[{name:'Export',disabled:true,value:'export'}];
  // searchOptions = [{name:'All Selected',value:0},{name:'Depositor',value:1},{name:'Non Depositor',value:2}];
  
  // rUsersCollumns:any = [];
  
  // rUsersCollumnHeaders:any = [
  //   [
  //     {value:'Sr. No.',bg:'white-drop'},
  //     {value:'Id',bg:'white-drop'},
  //     {value:'Name',bg:'white-drop'},
  //     {value:'User Name',bg:'white-drop'},
  //     {value:'Mobile',bg:'white-drop'},
  //     {value:'Amount',bg:'white-drop'},
  //     {value:'Register',bg:'white-drop'},
  //     {value:'Game Played',bg:'white-drop'},
  //     {value:'Deposit Count',bg:'white-drop'},
  //     {value:'View',bg:'white-drop'}
  //   ]
  // ];
  
  // rUsersData: {TotalCount:any; UserId: any;}[]=[];
  // rUsersRows: { value: any; bg: string; icon?: string }[][] = [];
  
  // pageNo=1;
  // rowCount: any ={f:0,l:0,t:0};
  // pageCount=[10,50,100,500,1000];
  // pagesTotal=1;
  // paginatorBlock:any=[];
  
  // currentQuery = {"Dates":[this.dateValue[0],this.dateValue[1]],"intParam1": 0,"PageNo": 1,"PageSize": this.pageCount[0],"SiteCode":sessionStorage.getItem('selectedSite'),"WalletTypeId":sessionStorage.getItem('WalChosen'),"PlayerId":""};
  
  // private loaderSubscriber!: Subscription;
  // private apiSubscriber: Subscription[]=[];
  // apiLoader={rlc_list:false,rlc_export:false};
  // constructor(private apiservice :ApiService, private utilities : CommonFunctionService) { }
  
  // ngOnInit(): void {
  //   this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
  //     this.apiLoader.rlc_list=('getReportRegisterUser' in loading)?true:false;
  //     this.apiLoader.rlc_export=('downloadAllReportData' in loading)?true:false;
  //   });
  //   this.GetRegisteredUsers(this.currentQuery);
  // }
  
  // setPaginator(){
  //   this.paginatorBlock = [];
  //   if (this.currentQuery.PageNo <= 4) {
  //     for (let i = 1; i <= 10 && i <= this.pagesTotal; i++) {
  //       this.paginatorBlock.push(i);
  //     }
  //   }
  //   else {
  //     for (let i = this.currentQuery.PageNo - 3; i <= this.currentQuery.PageNo + 6 && i <= this.pagesTotal; i++) {
  //       this.paginatorBlock.push(i);
  //     }
  //   }
  // }
  
  // searchRegistered(searchQuery:any){
  //   this.currentQuery.Dates=searchQuery.Dates;
  //   this.currentQuery.intParam1=searchQuery.Option;
  //   this.currentQuery.WalletTypeId=searchQuery.wallet;
  //   this.currentQuery.PlayerId=searchQuery.playerInput;
  //   this.currentQuery.PageNo = 1;
  //   this.GetRegisteredUsers(this.currentQuery);
  // }
  
  // onPaginatorChange(paginatorQuery:any){
  //   if(paginatorQuery.action=='next'){
  //     this.currentQuery.PageNo = this.currentQuery.PageNo+1;
  //   }
  //   else if(paginatorQuery.action=='previous'){
  //     this.currentQuery.PageNo = this.currentQuery.PageNo-1;
  //   }
  //   else if(paginatorQuery.action=='pageSize'){
  //     this.currentQuery.PageNo = 1;
  //     this.currentQuery.PageSize = paginatorQuery.pageSize;
  //   }
  //   else if(paginatorQuery.action=='pageNo'){
  //     this.currentQuery.PageNo = paginatorQuery.pageNo;
  //   }
  //   this.GetRegisteredUsers(this.currentQuery);
  // }
  
  // GetRegisteredUsers(searchQuery:any){
  //   let request = {
  //     "StartDateTime": moment(searchQuery.Dates[0]).format("MM-DD-yyyy"),
  //     "EndDateTime": moment(searchQuery.Dates[1]).format("MM-DD-yyyy"),
  //     "intParam1": searchQuery.intParam1,
  //     "PageNo": searchQuery.PageNo,
  //     "PageSize": searchQuery.PageSize,
  //     "SiteCode": searchQuery.SiteCode,
  //     "WalletTypeId":searchQuery.WalletTypeId,
  //     "PlayerId":searchQuery.PlayerId
  //   };
  //   this.rUsersRows=[];
  //   this.rUsersCollumns=[];
  //   this.pagesTotal=1;
  //   this.buttonData[0].disabled=true;
  //   this.rUsersData=[];
  //   this.apiSubscriber[0] = this.apiservice.sendRequest(config['getReportRegisterUser'], request,'getReportRegisterUser').subscribe((data: any) => {
  //     this.currentQuery=searchQuery;
  //     this.rUsersData=data;
  //     if(this.rUsersData[0]){
  //       this.buttonData[0].disabled=false;
  //       this.rUsersCollumns=this.rUsersCollumnHeaders;
  //       this.pagesTotal=Math.ceil(this.rUsersData[0].TotalCount/searchQuery.PageSize);
  //       this.rUsersData.forEach((element:any,index:any) => {
  //         let ctz = element.CreatedDateTZ?" "+element.CreatedDateTZ:'';
  //         this.rUsersRows.push([
  //           {value:((this.currentQuery.PageNo-1)*this.currentQuery.PageSize)+(index+1),bg:'white-cell'},
  //           {value:element.UserId,bg:'white-cell'},
  //           {value:element.FName,bg:'white-cell'},
  //           {value:element.UserName,bg:'white-cell'},
  //           {value:element.Mobile,bg:'white-cell'},
  //           {value:element.CurrencyType+' '+element.AccountBalance,bg:'white-cell'},
  //           {value:element.CreatedDate?moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
  //           {value:element.GamePlayed?'Yes':'',bg:'white-cell'},
  //           {value:element.DepositCount,bg:'white-cell'},
  //           {value:'',bg:'white-cell',icon:'View'}
  //         ])
  //       });
  //       this.rowCount={f:this.rUsersRows[0][0].value,l:this.rUsersRows[this.rUsersRows.length-1][0].value,t:this.rUsersData[0].TotalCount};
  //       this.setPaginator();
  //     }
  //     else{
  //       this.rowCount={f:0,l:0,t:0};
  //       this.rUsersCollumns=this.utilities.TableDataNone;
  //     }      
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }
  
  // onValueChange(formVal:any){
  //   if(formVal.type=='View'){
  //     window.open('/users/playerdetailview/'+this.rUsersData[formVal.row].UserId, '_blank');
  //   }
  // }
  
  // DownloadRegisteredUsersData() {
  //   let d1 = (moment(this.currentQuery.Dates[0]).format("DD/MM/yyyy HH:mm"));
  //   let d2 = (moment(this.currentQuery.Dates[1]).format("DD/MM/yyyy HH:mm"));
  //   let request = "?intParam1="+ this.currentQuery.intParam1 + "&StartDateTime=" + d1 + "&EndDateTime=" + d2 + '&SiteCode='+sessionStorage.getItem('selectedSite')+'&WalletTypeId='+this.currentQuery.WalletTypeId+'&PlayerId='+this.currentQuery.PlayerId;
  //   let docname = 'RegisteredUsers_Download_'+moment(this.currentQuery.Dates[0]).format("DD/MM/yyyy");
  //   this.apiservice.exportExcel(config['downloadAllReportData'] + request,docname,'downloadAllReportData');
  // }
  
  // ngOnDestroy() {
  //   if (this.loaderSubscriber) {
  //     this.loaderSubscriber.unsubscribe();
  //   }
  //   if(this.apiSubscriber[0]) {
  //     this.apiSubscriber[0].unsubscribe();
  //   }
  // }
  
}