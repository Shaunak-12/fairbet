import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { Subscription } from 'rxjs';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import _moment from 'moment';

import {default as _rollupMoment} from 'moment';
import { BankDetailsComponent } from '../bank-details/bank-details.component';
import { ApproveDetailsComponent } from '../approve-details/approve-details.component';
import { ModulesModule } from '@modules/modules/modules.module';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
  },
};

@Component({
  selector: 'app-withdrawal-request',
  imports: [
    ModulesModule,
    BankDetailsComponent,
    ApproveDetailsComponent
  ],
  templateUrl: './withdrawal-request.component.html',
  styleUrl: './withdrawal-request.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class WithdrawalRequestComponent implements OnInit, OnDestroy {
  @ViewChild('UDataDialogOpen') UDataDialogOpen!: TemplateRef<any>;
  @ViewChild('ApproveDialogOpen') ApproveDialogOpen!: TemplateRef<any>;
  AllUserinfo:any=[];
  UserinfoData:any=[];
  rowCount: any ={f:0,l:0,t:0};
  pageCount=[10,50,100,500,1000];
  pagesTotal=1;
  udataToView={};
  AcceptRejectVar="A";
  paginatorBlock:any=[];
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[]=[];
  apiLoader={wrc_list:false,wrc_export:false};
  dateValue: any=[new Date(),new Date()];
  maxDate=new Date();
  showExportDates=false;
  ExportClicked=false;
  dynamicControls = [
    // { changeAction: 'submit', que: 'wallet', type: 'dropdown', default:this.userWals[0][0], options: this.userWals.map(({ Id, Name, Code }) => ({ op: Name + ' - ' + Code, val: Id })), subque: [] },
    {que:'TransactionStatus',type: 'dropdown',changeAction:"submit",default:0,options:[{op:'All',val:'0'},{op:'Processing',val:'PR'},{op:'Reject',val:'R'},{op:'Pending',val:'P'},{op:'Approved',val:'A'}],subque: []},
    { que: 'Date', type: 'daterange', minDate: null ,maxDate: this.maxDate,startDate: this.maxDate, endDate: this.maxDate, subque: [] },
    { que: 'PlayerId', type: 'input', subque: [] },
    { que: 'Search', type: 'input', subque: [] }
  ];
  UserCollumnHeaders:any = [
    [{value:'Sr. No.',bg:'white-drop'},{value:'Id',bg:'white-drop'},{value:'Name',bg:'white-drop'},{value:'User Name',bg:'white-drop'},{value:'Mobile',bg:'white-drop'},{value:'Amount',bg:'white-drop'},
    {value:'Difference (D-W)',bg:'white-drop'},{value:'Date',bg:'white-drop'},{value:'Updated',bg:'white-drop'},{value:'Status',bg:'white-drop'},{value:'Bank',bg:'white-drop'},{value:'Profile',bg:'white-drop'},
    {value:'Action',bg:'white-drop'}]
  ];
  UserDataCollumns=this.UserCollumnHeaders;
  // currentQuery={"StartDateTime":moment(this.maxDate).format('YYYY-MM-DD HH:MM:SS'),"EndDateTime": moment(this.maxDate).format('YYYY-MM-DD HH:MM:SS'),"Search": "","PageNo": 1,"PageSize": this.pageCount[2],"TransactionStatus":'0',"SiteCode": sessionStorage.getItem('selectedSite'),"WalletTypeId":sessionStorage.getItem('WalChosen'),"PlayerId":""};
  currentQuery={"StartDateTime":moment(this.maxDate).format('YYYY-MM-DD HH:MM:SS'),"EndDateTime": moment(this.maxDate).format('YYYY-MM-DD HH:MM:SS'),"Search": "","PageNo": 1,"PageSize": this.pageCount[2],"TransactionStatus":'0',"SiteCode": sessionStorage.getItem('selectedSite'),"WalletTypeId":Number(sessionStorage.getItem('WalChosen')),"PlayerId":""};
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService,private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.apiLoader.wrc_list=('withdrawalData' in loading)?true:false;
      if('exportWithdrawalData' in loading){
        this.apiLoader.wrc_export=this.ExportClicked=true;
      }
      else{
        this.apiLoader.wrc_export=false;
        if(this.ExportClicked){
          this.showExportDates=false;
        }
      }
    });
    this.GetAllUsers();
  }
  
  initializeData()
  {
    this.AllUserinfo = [];
    this.UserinfoData = [];
    // this.currentQuery.WalletTypeId=sessionStorage.getItem('WalChosen');
    this.currentQuery.WalletTypeId = Number(sessionStorage.getItem('WalChosen')) || 0;

    if(this.apiSubscriber[0]) {
      this.apiSubscriber[0].unsubscribe();
    }
  }
  
  onPaginatorChange(paginatorQuery:any){
    if(paginatorQuery.action=='pageSize'){
      this.currentQuery.PageNo = 1;
      this.currentQuery.PageSize = paginatorQuery.pageSize;
    }
    else if(paginatorQuery.action=='pageNo'){
      this.currentQuery.PageNo = paginatorQuery.pageNo;
    }
    this.GetAllUsers();
  }
  
  GetAllUsers() {
    this.initializeData();
    this.apiSubscriber[0] = this.apiservice.sendRequest(config['withdrawalData'], this.currentQuery, 'withdrawalData').subscribe((data: any) => {
      this.AllUserinfo=data;
      if(this.AllUserinfo[0]){
        this.UserDataCollumns=this.UserCollumnHeaders;
        this.pagesTotal=Math.ceil(this.AllUserinfo[0].TotalCount/this.currentQuery.PageSize);
        let bg_cell = ''
        this.AllUserinfo.forEach((element:any,index:any) => {
          bg_cell = element.FirstDeposit && (element.StatusCode == 'PR' || element.StatusCode == 'P')?'blue-blink-cell ':'';
          bg_cell +=  (element.DifferenceAmount<0 && element.DifferenceAmount > -2000)?'light-red':(element.DifferenceAmount<-2000 && element.DifferenceAmount > -10000)?'red':
          (element.DifferenceAmount<-10000 && element.DifferenceAmount > -50000)?'dark-red':(element.DifferenceAmount<-50000 )?'black-red':'white-cell';
          let ctz = element.CreatedDateTZ?" "+element.CreatedDateTZ:'';
          let utz = element.UpdatedDateTZ?" "+element.UpdatedDateTZ:'';
          let sufArray = [];
          if(element.UTRNumber){
            sufArray.push(element.UTRNumber);
          }
          if(element.Description){
            sufArray.push(element.Description);
          }

          this.UserinfoData.push([
            {value:((this.currentQuery.PageNo-1)*this.currentQuery.PageSize)+(index+1),bg:bg_cell},
            {value:element.UserId,bg:bg_cell,...(element.UniqueId!="00000000-0000-0000-0000-000000000000"?{sufText:'Request Id : '+element.UniqueId}:{})},
            {value:element.FName,bg:bg_cell,sufText:'AC : '+element.AccountNumber},
            {value:element.UserName,bg:bg_cell},
            {value:element.Mobile,bg:bg_cell},
            {value:element.AccountBalance,bg:bg_cell},
            {value:element.DifferenceAmount?element.DifferenceAmount:element.DifferenceAmount==0?element.DifferenceAmount:'Invalid',bg:bg_cell},
            {value:element.CreatedDate?moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:bg_cell,sufText:element.TimeAgo},
            {value:element.UpdatedDate?moment(element.UpdatedDate).format("h:mm:ss A, DD-MMM-yyyy")+utz:'',bg:bg_cell,sufTextArr:sufArray},
            {value:element.StatusName,bg:bg_cell},
            {value:'',bg:bg_cell,icon:'View'},
            {value:'',bg:bg_cell,icon:'feather',iconvalue:'Users'},
            {bg:bg_cell,icon:'Multi',value:[
              ...(element.StatusCode=='PR'?[{value:'Approve',bg:bg_cell,icon:'None',hrefvalue:element.FileNameServer}]:[]),
              ...(element.StatusCode=='P'?[{value:'Process',bg:bg_cell,icon:'None'}]:[]),
              ...((element.StatusCode=='P' || element.StatusCode=='PR')?[{value:'Reject',bg:bg_cell,icon:'None'}]:[]),
              ...((element.StatusCode!='P' && element.StatusCode!='PR')?[{value:element.StatusName,bg:bg_cell}]:[])]
            }
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
      console.log(error);
    });
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

  onValueChange(formVal:any){
    if(formVal.type=='Users'){
      window.open('/users/playerdetailview/'+this.AllUserinfo[formVal.row].UserId, '_blank');
    }
    if(formVal.type=='View'){
      this.udataToView=this.AllUserinfo[formVal.row];
      this.BDataOpenPopup()
    }
    if(formVal.type=='Process'){
      this.udataToView=this.AllUserinfo[formVal.row];
      this.ProcessWithdrawal();
    }
    if(formVal.type=='Approve'){
      this.AcceptRejectVar="A";
      this.udataToView=this.AllUserinfo[formVal.row];
      this.ApproveOpenPopup();
    }
    if(formVal.type=='Reject'){
      this.AcceptRejectVar="R";
      this.udataToView=this.AllUserinfo[formVal.row];
      this.ApproveOpenPopup();
    }
  }

  BDataOpenPopup() {
    let dialogRef = this.dialog.open(this.UDataDialogOpen, {
      width: '600px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {})
  }

  closePopup(){
    this.GetAllUsers();
    this.dialog.closeAll();
  }

  ApproveOpenPopup() {
    let dialogRef = this.dialog.open(this.ApproveDialogOpen, {
      height: '900x',
      width: '600px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {})
  }

  ProcessWithdrawal(){
    this.apiservice.sendRequest(config['processWithdrawal'], this.udataToView).subscribe((data: any) => {
      if(data.ErrorCode=='1'){
        this.utilities.toastMsg("success", "Success", data.ErrorMessage);
        this.GetAllUsers();
      }
      else{
        this.utilities.toastMsg("error", "Error", data.ErrorMessage);
      }
    }, (error) => {
      this.utilities.toastMsg("error", "Can not process", '');
      console.log(error);
    });
  }
  
  getSearchQuery(formVal:any)
  {
    this.currentQuery.TransactionStatus=formVal.TransactionStatus.value;
    this.currentQuery.PlayerId=formVal.PlayerId.value;
    this.currentQuery.Search=formVal.Search.value;
    this.currentQuery.StartDateTime=moment(formVal.Date.value1).format('YYYY-MM-DD HH:mm:SS');
    this.currentQuery.EndDateTime=moment(formVal.Date.value2).format('YYYY-MM-DD HH:mm:SS');
    this.currentQuery.PageNo = 1;
    this.GetAllUsers();
  }

  DownloadWithdrawalRequestData() {
    let d1 = (moment(this.dateValue[0]).format("DD/MM/yyyy 00:00"));
    let d2 = (moment(this.dateValue[1]).format("DD/MM/yyyy 00:00"));
    let request = "?SiteCode="+sessionStorage.getItem('selectedSite')+"&StartDateTime="+d1+"&EndDateTime="+d2+"&Status="+this.currentQuery.TransactionStatus+'&WalletTypeId='+this.currentQuery.WalletTypeId+'&PlayerId='+this.currentQuery.PlayerId;
    let docname = 'WithdrawalRequest_Download_'+sessionStorage.getItem('chosenSite');
    this.apiservice.exportExcel(config['exportWithdrawalData'] + request,docname,'exportWithdrawalData');
  }

  ngOnDestroy() {
    if (this.loaderSubscriber) {
      this.loaderSubscriber.unsubscribe();
    }
    if(this.apiSubscriber[0]) {
      this.apiSubscriber[0].unsubscribe();
    }
  }
}