import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import moment from 'moment';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { CommonFunctionService } from '@services/common-function.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModulesModule } from '@modules/modules/modules.module';
import { AddPageComponent } from './add-page/add-page.component';
import { StatusPageComponent } from './status-page/status-page.component';

@Component({
  selector: 'app-pages',
  imports: [
    ModulesModule,
    AddPageComponent,StatusPageComponent
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent implements OnInit, OnDestroy {
  @ViewChild('AddPageDialogopen') AddPageDialogopen!: TemplateRef<any>;
  @ViewChild('BlockUserPopUp') BlockUserPopUp!: TemplateRef<any>;
  
  buttonData=[{name:'Export',disabled:true,value:'export'}];
  
  rUsersCollumns:any = [];
  
  rUsersCollumnHeaders:any = [
    [
      {value:'Sr. No.',bg:'white-drop'},
      {value:'Status',bg:'white-drop'},
      {value:'Id',bg:'white-drop'},
      {value:'Name',bg:'white-drop'},
      {value:'Page Name',bg:'white-drop'},
      {value:'Handle',bg:'white-drop'},
      {value:'Mobile',bg:'white-drop'},
      {value:'Created Date',bg:'white-drop'},
      {value:'Profile',bg:'white-drop'},
      {value:'View',bg:'white-drop'}
    ]
  ];
  
  // allPageData=[];
  // PageRows=[];
  
  allPageData: Array<{ TotalCount: number; CreatedDateTZ?: string; StatusId: number; DCPageId: number; Name: string; DCPageName: string; Handle: string; Mobile: string; CreatedDate?: string }> = [];
  PageRows: Array<Array<{ value: any; bg: string; icon?: string; iconvalue?: string }>> = [];
  
  pageNo=1;
  rowCount: any ={f:0,l:0,t:0};
  pageCount=[10,50,100,500,1000];
  pagesTotal=1;
  paginatorBlock:any=[];
  
  currentQuery = {"Search": "","PageNo": 1,"PageSize": this.pageCount[0],"SiteCode":sessionStorage.getItem('selectedSite')};
  
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[]=[];
  apiLoader={udl_list:false,udl_export:false};
  
  dIndex={status:{row:0,col:0,use:false}};
  SelectedDCPage={};
  constructor(private apiservice :ApiService, private utilities : CommonFunctionService, private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.apiLoader.udl_list=('getCreatorPages' in loading)?true:false;
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
    this.rUsersCollumns=[];
    this.pagesTotal=1;
    this.buttonData[0].disabled=true;
    this.allPageData=[];
  }
  
  GetPagesData(searchQuery:any){
    let request = {
      "PageNo": searchQuery.PageNo,
      "PageSize": searchQuery.PageSize,
      "SiteCode": searchQuery.SiteCode,
      "Search":searchQuery.Search
    };
    this.initializeData();
    this.apiSubscriber[0] = this.apiservice.sendRequest(config['getCreatorPages'], request,'getCreatorPages').subscribe((data: any) => {
      this.currentQuery=searchQuery;
      this.allPageData=data;
      if(this.allPageData[0]){
        this.buttonData[0].disabled=false;
        this.rUsersCollumns=this.rUsersCollumnHeaders;
        this.pagesTotal=Math.ceil(this.allPageData[0].TotalCount/searchQuery.PageSize);
        this.allPageData.forEach((element:any,index:any) => {
          let ctz = element.CreatedDateTZ?" "+element.CreatedDateTZ:'';
          this.PageRows.push([
            {value:((this.currentQuery.PageNo-1)*this.currentQuery.PageSize)+(index+1),bg:'white-cell'},
            {value:element.StatusId,bg:'white-cell',icon:'Toggle'},
            {value:element.DCPageId,bg:'white-cell'},
            {value:element.Name,bg:'white-cell'},
            {value:element.DCPageName,bg:'white-cell'},
            {value:element.Handle,bg:'white-cell'},
            {value:element.Mobile,bg:'white-cell'},
            {value:element.CreatedDate?moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
            {value:'',bg:'white-cell',icon:'feather',iconvalue:'instagram'},
            {value:'',bg:'white-cell',icon:'View'}
          ])
        });
        this.rowCount={f:this.PageRows[0][0].value,l:this.PageRows[this.PageRows.length-1][0].value,t:this.allPageData[0].TotalCount};
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
    if(formVal.col==9 && formVal.type=='View'){
      let extrabit = Math.floor(Math.random() * 20) + 1;
      window.open('/creator/dcpromotion/'+(this.allPageData[formVal.row].DCPageId * 3 + extrabit)+'/'+extrabit+'/'+this.allPageData[formVal.row].Handle, '_blank');
    }
    if(formVal.col==8 && formVal.type=='instagram'){
      window.open('https://www.instagram.com/'+this.allPageData[formVal.row].Handle+'/reels/', '_blank');
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