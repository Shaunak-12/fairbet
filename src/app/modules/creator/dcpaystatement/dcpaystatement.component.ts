import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import moment from 'moment';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { CommonFunctionService } from '@services/common-function.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModulesModule } from '@modules/modules/modules.module';
import { AddStatementComponent } from './add-statement/add-statement.component';
import { StatusPageComponent } from '../pages/status-page/status-page.component';

@Component({
  selector: 'app-dcpaystatement',
  imports: [
    ModulesModule,
    AddStatementComponent,
    StatusPageComponent
  ],
  templateUrl: './dcpaystatement.component.html',
  styleUrl: './dcpaystatement.component.scss'
})
export class DcpaystatementComponent implements OnInit, OnDestroy {
  @ViewChild('AddPageDialogopen') AddPageDialogopen!: TemplateRef<any>;
  @ViewChild('BlockUserPopUp') BlockUserPopUp!: TemplateRef<any>;
  todayDate = new Date();
  refDate = new Date();
  dateValue: any=[new Date(this.refDate.setMonth(this.refDate.getMonth()-1)),new Date()];
  
  buttonData=[{name:'Export',disabled:true,value:'export'}];
  
  // dcpsCollumns:any = [];
  dcpsCollumns: { value: string; bg: string; }[][] = [];

  dcpsCollumnHeaders:any = [
    [
      {value:'Sr. No.',bg:'white-drop'},
      {value:'Id',bg:'white-drop'},
      {value:'Page Name',bg:'white-drop'},
      {value:'User Name',bg:'white-drop'},
      {value:'Mobile',bg:'white-drop'},
      {value:'Handle',bg:'white-drop'},
      {value:'URL',bg:'white-drop'},
      {value:'Amount',bg:'white-drop'},
      {value:'Reference Id',bg:'white-drop'},
      {value:'Description',bg:'white-drop'},
      {value:'Status',bg:'white-drop'},
      {value:'Created By',bg:'white-drop'},
      {value:'Created Date',bg:'white-drop'}
    ]
  ];
  
  // allPageData=[];
  // PageRows=[];
  
  allPageData:{TotalCount: any;DCPageId: any; StatusId: any }[]=[];
  PageRows: { value: any; bg: string; icon?: string; }[][] = [];
  
  pageNo=1;
  rowCount: any ={f:0,l:0,t:0};
  pageCount=[10,50,100,500,1000];
  pagesTotal=1;
  paginatorBlock:any=[];
  
  currentQuery = {"Dates":[this.dateValue[0],this.dateValue[1]],"Search": "","PageNo": 1,"PageSize": this.pageCount[0],"SiteCode":sessionStorage.getItem('selectedSite')};
  
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[]=[];
  apiLoader={udl_list:false,udl_export:false};
  
  dIndex={status:{row:0,col:0,use:false}};
  SelectedDCPage={};
  constructor(private apiservice :ApiService, private utilities : CommonFunctionService, private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.apiLoader.udl_list=('getCreatorStatements' in loading)?true:false;
    });
    this.GetPagesData(this.currentQuery);
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
  
  searchPagesData(searchQuery:any){
    this.currentQuery.Dates=searchQuery.Dates;
    this.currentQuery.PageNo = 1;
    this.currentQuery.Search = searchQuery.searchInput;
    this.GetPagesData(this.currentQuery);
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
    this.GetPagesData(this.currentQuery);
  }
  
  initializeData(){
    this.dIndex={status:{row:0,col:0,use:false}};
    this.PageRows=[];
    this.dcpsCollumns=[];
    this.pagesTotal=1;
    this.buttonData[0].disabled=true;
    this.allPageData=[];
  }
  
  GetPagesData(searchQuery:any){
    let request = {
      "StartDateTime": moment(searchQuery.Dates[0]).format("MM-DD-yyyy"),
      "EndDateTime": moment(searchQuery.Dates[1]).format("MM-DD-yyyy"),
      "PageNo": searchQuery.PageNo,
      "PageSize": searchQuery.PageSize,
      "SiteCode": searchQuery.SiteCode,
      "Search":searchQuery.Search
    };
    this.initializeData();
    this.apiSubscriber[0] = this.apiservice.sendRequest(config['getCreatorStatements'], request,'getCreatorStatements').subscribe((data: any) => {
      this.currentQuery=searchQuery;
      this.allPageData=data;
      if(this.allPageData[0]){
        this.buttonData[0].disabled=false;
        this.dcpsCollumns=this.dcpsCollumnHeaders;
        this.pagesTotal=Math.ceil(this.allPageData[0].TotalCount/searchQuery.PageSize);
        this.allPageData.forEach((element:any,index:any) => {
          let ctz = element.CreatedDateTZ?" "+element.CreatedDateTZ:'';
          this.PageRows.push([
            {value:((this.currentQuery.PageNo-1)*this.currentQuery.PageSize)+(index+1),bg:'white-cell'},
            {value:element.Id,bg:'white-cell'},
            {value:element.DCPageName,bg:'white-cell'},
            {value:element.UserName,bg:'white-cell'},
            {value:element.Mobile,bg:'white-cell'},
            {value:element.Handle,bg:'white-cell'},
            {value:element.URL,bg:'white-cell'},
            {value:this.utilities.roundOffNum(element.Amount),bg:'white-cell'},
            {value:element.ReferenceId,bg:'white-cell'},
            {value:element.Description,bg:'white-cell'},
            {value:element.Status,bg:'white-cell'},
            {value:element.CreatedBy,bg:'white-cell'},
            {value:element.CreatedDate?moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
          ])
        });
        this.rowCount={f:this.PageRows[0][0].value,l:this.PageRows[this.PageRows.length-1][0].value,t:this.allPageData[0].TotalCount};
        this.setPaginator();
      }
      else{
        this.rowCount={f:0,l:0,t:0};
        this.dcpsCollumns=this.utilities.TableDataNone;
      }      
    }, (error) => {
      console.log(error);
    });
  }
  
  onValueChange(formVal:any){
    if(formVal.col==8 && formVal.type=='View'){
      let extrabit = Math.floor(Math.random() * 20) + 1;
      window.open('/creator/dcpromotion/'+(this.allPageData[formVal.row].DCPageId * 3 + extrabit)+'/'+extrabit, '_blank');
    }
    if(formVal.col==1){
      this.dIndex.status.row=formVal.row;
      this.dIndex.status.col=formVal.col;
      this.dIndex.status.use=true;
      this.PageRows[this.dIndex.status.row][this.dIndex.status.col].icon='Loading';
      this.SelectedDCPage=this.allPageData[formVal.row];
      this.PageStatusOpenPopup();
    }
  }
  
  AddPageOpenPopup() {
    let dialogRef = this.dialog.open(this.AddPageDialogopen, {
      width: '800px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
  
  PageStatusOpenPopup() {
    let dialogRef = this.dialog.open(this.BlockUserPopUp, {
      width: '800px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.PageRows[this.dIndex.status.row][this.dIndex.status.col].icon='Toggle';
    });
  }
  
  ngOnDestroy(): void {
    if (this.loaderSubscriber) {
      this.loaderSubscriber.unsubscribe();
    }
    if(this.apiSubscriber[0]) {
      this.apiSubscriber[0].unsubscribe();
    }
  }
  
  closePopup(){
    this.dialog.closeAll();
  }
  
  AlterToggle(pageStatus: any){
    this.PageRows[this.dIndex.status.row][this.dIndex.status.col].value=pageStatus.value;
    this.allPageData[this.dIndex.status.row].StatusId=pageStatus.value;
  }
}