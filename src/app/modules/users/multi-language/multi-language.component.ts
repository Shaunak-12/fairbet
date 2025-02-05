import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { ModulesModule } from '@modules/modules/modules.module';
import { AddLanguageComponent } from './add-language/add-language.component';

@Component({
  selector: 'app-multi-language',
  imports: [
    ModulesModule,
    AddLanguageComponent
  ],
  templateUrl: './multi-language.component.html',
  styleUrl: './multi-language.component.scss'
})
export class MultiLanguageComponent implements OnInit {
  @ViewChild('addLanguage') addLanguage!: TemplateRef<any>;
  AllRequestinfo:any=[];
  errorDataInfo:any=[];
  rowCount: any ={f:0,l:0,t:0};
  pageCount=[10,50,100,500,1000];
  pagesTotal=1;
  udataToView: { LanguageCode?: string, APIErrorCode?: string, ErrorMessage?: string } = {};
  AcceptRejectVar="A";
  paginatorBlock:any=[];
  dynamicControls = [{type:'select',changeAction:"submit",default:{name:'All',value:'0'},options:[{name:'English',value:'en'},{name:'Bangla',value:'bn'},{name:'Binglish',value:'be'}]},
  {placeholder:'Search',type:'text',label:'Search'}
];
  UserCollumnHeaders:any = [
    [{value:'Sr. No.',bg:'white-drop'},{value:'APIErrorCode',bg:'white-drop'},{value:'Language Code',bg:'white-drop'},{value:'ErrorMessage',bg:'white-drop'}]
  ];
  dIndex={status:{row:0,col:0,use:false}}
  UserDataCollumns=this.UserCollumnHeaders;
  currentQuery={"Search": "","LangCode": "0","PageNo": 1,"PageSize": this.pageCount[0],"SiteCode": sessionStorage.getItem('selectedSite')};
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[]=[];
  apiLoader={crc_list:false};
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService,private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.apiLoader.crc_list=('multiLanguage' in loading)?true:false;
      if (this.dIndex.status.use) {
        if (
          this.errorDataInfo &&
          this.errorDataInfo[this.dIndex.status.row] &&
          this.errorDataInfo[this.dIndex.status.row][this.dIndex.status.col]
        ) {
          const errorInfo = this.errorDataInfo[this.dIndex.status.row][this.dIndex.status.col];
          errorInfo['loader'] = 'saveLan' in loading ? true : false;
        }
      }
    });
    this.GetAll();
  }
  
  initializeData()
  {
    this.AllRequestinfo = [];
    this.errorDataInfo = [];
    this.udataToView = {};
  }
  
  onPaginatorChange(paginatorQuery:any){
    if(paginatorQuery.action=='pageSize'){
      this.currentQuery.PageNo = 1;
      this.currentQuery.PageSize = paginatorQuery.pageSize;
    }
    else if(paginatorQuery.action=='pageNo'){
      this.currentQuery.PageNo = paginatorQuery.pageNo;
    }
    this.GetAll();
  }
  
  GetAll() {
    this.initializeData();
    let param = this.utilities.setForGetNew(this.currentQuery);
    this.apiSubscriber[0] = this.apiservice.getRequest(config['multiLanguage']+param, 'multiLanguage').subscribe((data: any) => {
      this.AllRequestinfo=data;
      if(this.AllRequestinfo[0]){
        this.UserDataCollumns=this.UserCollumnHeaders;
        this.pagesTotal=Math.ceil(this.AllRequestinfo[0].TotalCount/this.currentQuery.PageSize);
        let bg_cell = ''
        this.AllRequestinfo.forEach((element:any,index:any) => {
          this.errorDataInfo.push([
            {value:((this.currentQuery.PageNo-1)*this.currentQuery.PageSize)+(index+1),bg:bg_cell},
            {value:element.APIErrorCode,bg:bg_cell},
            {value:element.LanguageCode,bg:bg_cell},
            {value:element.ErrorMessage ,bg:bg_cell,icon:'Textarea',loader:false},
          ])
        });
        this.rowCount={f:this.errorDataInfo[0][0].value,l:this.errorDataInfo[this.errorDataInfo.length-1][0].value,t:this.AllRequestinfo[0].TotalCount};
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
    if(formVal.col==3){
      this.dIndex.status.use = true;
      this.dIndex.status.row = formVal.row;
      this.dIndex.status.col = formVal.col;
      this.udataToView=this.AllRequestinfo[formVal.row];
      let param = {
        "LanguageCode":this.udataToView['LanguageCode'],
        "APIErrorCode":this.udataToView['APIErrorCode'],
        "ErrorMessage":formVal.value
    }
      this.saveMsg(param);
    }
  }
  saveMsg(param:any){
    this.apiservice.sendRequest(config['saveLan'],param,'saveLan').subscribe(
     (data: any)=>{
        if (data) {
          if (data['ErrorCode'] == '1' ) {
            this.utilities.toastMsg('success',"Success", data['ErrorMessage']);
            this.GetAll();
          } else {
            this.utilities.toastMsg('error',"Failed",data['ErrorMessage']);
          }
        }
     }, (error) => {
      console.log(error);
    }
    );

  }
 
  
  getSearchQuery(formVal:any)
  {
    this.currentQuery.LangCode=formVal.C0;
    this.currentQuery.Search=formVal.C1;
    this.currentQuery.PageNo = 1;
    this.GetAll();
  }
  openPopup() {
    let dialogRef = this.dialog.open(this.addLanguage, {
      width: '800px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.closePopup();
    })
  }

  closePopup(){
    this.dialog.closeAll();
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
