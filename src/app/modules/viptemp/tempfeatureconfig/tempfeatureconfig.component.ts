import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { Subscription } from 'rxjs';
import moment from 'moment';
import { ModulesModule } from '@modules/modules/modules.module';
import { AddFormTfcComponent } from './add-form-tfc/add-form-tfc.component';

@Component({
  selector: 'app-tempfeatureconfig',
  imports: [
    ModulesModule,
    AddFormTfcComponent,
  ],
  templateUrl: './tempfeatureconfig.component.html',
  styleUrl: './tempfeatureconfig.component.scss'
})
export class TempfeatureconfigComponent implements OnInit {
  @ViewChild('addForm') addForm!: TemplateRef<any>;
  AllTmpFeatinfo:any=[];
  tmpFeatInfo:any=[];
  rowCount:any ={f:0,l:0,t:0};
  pageCount=[10,50,100,500,1000];
  pagesTotal=1;
  udataToView={};
  AcceptRejectVar="A";
  paginatorBlock:any=[];
  userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
  defWal=this.userWals.filter((wal: { Id: number; }) => wal.Id == parseInt(sessionStorage.getItem('WalChosen')||'{}'))[0];
  allTmp:any=[];
  allLev:any=[];
  allFeatures:any=[];
  defTmp:any=[];
  dynamicControls = [
    {changeAction:'selObj',type:'select',default:{name:this.defWal.Name+'-'+this.defWal.Code,value:this.defWal.Id},options:this.userWals.filter(({Id}:{Id:any;})=>Id!==this.defWal.Id).map(({Id,Name,Code}:{Id:any; Name: any; Code: any;})=>({name:Name+'-'+Code,value:Id}))},
    {type:'select',default:{name:'Select',value:''},options:[]},
    {changeAction:'submit',type:'select',default:{name:'Select',value:''},options:[]}
  ];
  UserCollumnHeaders:any = [[
    {value:'Sr. No.',bg:'white-drop'},
    {value:'Status',bg:'white-drop'},
    {value:'Id',bg:'white-drop'},
    {value:'Template Name',bg:'white-drop'},
    {value:'Feature Name',bg:'white-drop'},
    {value:'Created Date',bg:'white-drop'},
    {value:'Updated Date',bg:'white-drop'}
  ]];
  UserDataCollumns=this.UserCollumnHeaders;
  currentQuery={"FeaturesId":"","SiteCode":sessionStorage.getItem('selectedSite'),"WalletTypeId":sessionStorage.getItem('WalChosen'),"TemplateId":''};
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[]=[];
  apiLoader={crc_list:false};
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService,private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.apiLoader.crc_list=('getTmpFeatMap' in loading)?true:false;
    });
    this.apiSubscriber[0] = this.apiservice.getRequest(config['getAllTemplates']+"?SiteCode="+sessionStorage.getItem('selectedSite'), 'getAllTemplates').subscribe((data: any) => {
      this.allTmp=data;
      this.selWal({C0:this.currentQuery.WalletTypeId});
    }, (error) => {
      console.log(error);
    });
    this.apiSubscriber[1] = this.apiservice.getRequest(config['getVIPTmpFeatures'], 'getVIPTmpFeatures').subscribe((data: any) => {
      this.allFeatures=data.map(({ Id, Name }:{ Id: any; Name:any; }) => ({ name: Name, value: Id }));
      this.dynamicControls[2].options=this.allFeatures;
    }, (error) => {
      console.log(error);
    });
    this.GetAll();
  }
  
  initializeData()
  {
    this.AllTmpFeatinfo = [];
    this.tmpFeatInfo = [];
    this.udataToView = {};
    // this.currentQuery.WalletTypeId=sessionStorage.getItem('WalChosen');
  }
  
  onPaginatorChange(paginatorQuery:any){
    if(paginatorQuery.action=='pageSize'){
      // this.currentQuery.PageNo = 1;
      // this.currentQuery.PageSize = paginatorQuery.pageSize;
    }
    else if(paginatorQuery.action=='pageNo'){
      // this.currentQuery.PageNo = paginatorQuery.pageNo;
    }
    this.GetAll();
  }
  
  GetAll() {
    this.initializeData();
    this.apiSubscriber[2] = this.apiservice.sendRequest(config['getTmpFeatMap'],this.currentQuery, 'getTmpFeatMap').subscribe((data: any) => {
      this.AllTmpFeatinfo=data;
      if(this.AllTmpFeatinfo[0]){
        this.UserDataCollumns=this.UserCollumnHeaders;
        // this.pagesTotal=Math.ceil(this.AllTmpFeatinfo[0].TotalCount/this.currentQuery.PageSize);
        let bg_cell = ''
        this.AllTmpFeatinfo.forEach((element:any,index:any) => {
          let ctz = element.CreatedDateTZ?" "+element.CreatedDateTZ:'';
          this.tmpFeatInfo.push([
            {value:(index+1),bg:bg_cell},
            {value:element.IsActive,bg:'white-cell',icon:'Toggle'},
            {value:element.Id,bg:bg_cell},
            {value:element.TemplateName,bg:bg_cell},
            {value:element.FeaturName,bg:bg_cell},
            {value:element.CreatedDate?moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
            {value:element.UpdatedDate?moment(element.UpdatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
          ])
        });
        this.rowCount={f:this.tmpFeatInfo[0][0].value,l:this.tmpFeatInfo[this.tmpFeatInfo.length-1][0].value,t:this.AllTmpFeatinfo[0].TotalCount};
        // this.setPaginator();
      }
      else{
        this.rowCount={f:0,l:0,t:0};
        this.UserDataCollumns=this.utilities.TableDataNone;
      }
    }, (error) => {
      console.log(error);
    });
  }

  curL:any={};
  
  onValueChange(InpVal:any){
    if(InpVal.type=='Toggle'){
      this.curL=this.AllTmpFeatinfo[InpVal.row];
      this.tmpFeatInfo[InpVal.row][InpVal.col].icon='Loading';
      this.ChangeLevelStatus(InpVal)
    }
  }

  ChangeLevelStatus(InpVal:any){
    let param = config['setTmpFeatStat'] + '?Id='+this.curL.Id;
    this.apiservice.getRequest(param,'setTmpFeatStat').subscribe((data: any) => {
      if(data.ErrorCode=='1'){
        this.utilities.toastMsg("success", "Success", data.ErrorMessage);
        this.tmpFeatInfo[InpVal.row][InpVal.col].value=InpVal.value?1:0;
        this.tmpFeatInfo[InpVal.row][InpVal.col].icon='Toggle';
      }
      else{
        this.utilities.toastMsg("error", "Error", data.ErrorMessage);
        this.tmpFeatInfo[InpVal.row][InpVal.col].icon='Toggle';
      }
    }, (error) => {
      this.utilities.toastMsg("error", "Can not process", '');
      console.log(error);
    });
  }
  
  saveMsg(param:any){
    this.apiservice.sendRequest(config['saveLan'],param,'saveLan').subscribe((data: any)=>{
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
    this.currentQuery.FeaturesId=formVal.C2;
    this.currentQuery.WalletTypeId=formVal.C0;
    this.currentQuery.TemplateId=formVal.C1;
    this.GetAll();
  }
  
  selWal(formVal:any)
  {
    let mTmp = this.allTmp.find((wal: { WalletTypeId: any; }) => wal.WalletTypeId == formVal.C0);
    if(mTmp&&mTmp.WalletwsList[0]){
      this.defTmp=mTmp.WalletwsList.map(({ Id, Name }:{ Id:any; Name: any;}) => ({ name: Name, value: Id }));
      this.dynamicControls[1].options=this.defTmp;
    }
    else{
      this.dynamicControls[1].options=[];
    }
  }
  
  openPopup() {
    let dialogRef = this.dialog.open(this.addForm, {
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