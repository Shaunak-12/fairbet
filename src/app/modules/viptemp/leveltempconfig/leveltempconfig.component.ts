import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { Subscription } from 'rxjs';
import moment from 'moment';
import { ModulesModule } from '@modules/modules/modules.module';
import { AddlevtempconfComponent } from './addlevtempconf/addlevtempconf.component';
import { EditlevtempconfComponent } from './editlevtempconf/editlevtempconf.component';


@Component({
  selector: 'app-leveltempconfig',
  imports: [
    ModulesModule,
    AddlevtempconfComponent,
    EditlevtempconfComponent
  ],
  templateUrl: './leveltempconfig.component.html',
  styleUrl: './leveltempconfig.component.scss'
})
export class LeveltempconfigComponent implements OnInit {
  @ViewChild('addForm') addForm!: TemplateRef<any>;
  @ViewChild('EditDialogOpen') EditDialogOpen!: TemplateRef<any>;
  AllRequestinfo:any=[];
  errorDataInfo:any=[];
  rowCount: any ={f:0,l:0,t:0};
  pageCount=[10,50,100,500,1000];
  pagesTotal=1;
  udataToView={};
  AcceptRejectVar="A";
  paginatorBlock:any=[];
  userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
  defWal=this.userWals.filter((wal: { Id: number; }) => wal.Id == parseInt(sessionStorage.getItem('WalChosen')||'{}'))[0];
  allTmp:any=[];
  allLev:any=[];
  defTmp:any=[];
  dynamicControls = [
    {changeAction:'selObj',type:'select',default:{name:this.defWal.Name+'-'+this.defWal.Code,value:this.defWal.Id},options:this.userWals.filter(({Id}:{Id: any})=>Id!==this.defWal.Id).map(({Id,Name,Code}:{Id: any; Name: any; Code: any;})=>({name:Name+'-'+Code,value:Id}))},
    {changeAction:'submit',type:'select',default:{name:'Select',value:''},options:[]}
  ];
  UserCollumnHeaders:any = [[
    {value:'Sr. No.',bg:'white-drop'},
    // {value:'Id',bg:'white-drop'},
    {value:'Level Name',bg:'white-drop'},
    {value:'Template Name',bg:'white-drop'},
    {value:'Deposit Reqd.',bg:'white-drop'},
    {value:'Upgrade Bet Reqd.',bg:'white-drop'},
    {value:'Upgrade Bonus',bg:'white-drop'},
    {value:'Daily Bonus',bg:'white-drop'},
    {value:'Weekly Bonus',bg:'white-drop'},
    {value:'Monthly Bonus',bg:'white-drop'},
    {value:'Bet Turnover Wagering',bg:'white-drop'},
    {value:'Deposit Withdrawal Turnover Wagering',bg:'white-drop'},
    {value:'Bet Withdrawal Turnover Wagering',bg:'white-drop'},
    {value:'Day Freq',bg:'white-drop'},
    {value:'Week Freq',bg:'white-drop'},
    {value:'Month Freq',bg:'white-drop'},
    {value:'Daily Deposit Amount',bg:'white-drop'},
    {value:'Weekly Deposit Amount',bg:'white-drop'},
    {value:'Monthly Deposit Amount',bg:'white-drop'},
    {value:'Created Date',bg:'white-drop'},
    {value:'Updated Date',bg:'white-drop'},
    {value:'Edit',bg:'white-drop'}
  ]];
  dIndex={status:{row:0,col:0,use:false}}
  UserDataCollumns=this.UserCollumnHeaders;
  currentQuery={"SiteCode":sessionStorage.getItem('selectedSite'),"WalletTypeId":sessionStorage.getItem('WalChosen'),"TemplateId":''};
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[]=[];
  apiLoader={crc_list:false};
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService,private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.apiLoader.crc_list=('getLvlTmpMap' in loading)?true:false;
      if (this.dIndex.status.use)
      {
        if (this.errorDataInfo &&this.errorDataInfo[this.dIndex.status.row] &&this.errorDataInfo[this.dIndex.status.row][this.dIndex.status.col])
        {
          const errorInfo = this.errorDataInfo[this.dIndex.status.row][this.dIndex.status.col];
          errorInfo['loader'] = 'saveLan' in loading ? true : false;
        }
      }
    });
    this.apiSubscriber[0] = this.apiservice.getRequest(config['getAllTemplates']+"?SiteCode="+sessionStorage.getItem('selectedSite'), 'getAllTemplates').subscribe((data: any) => {
      this.allTmp=data;
      this.selWal({C0:this.currentQuery.WalletTypeId});
    }, (error) => {
      console.log(error);
    });
    this.apiSubscriber[0] = this.apiservice.getRequest(config['getAllLevels']+"?SiteCode="+sessionStorage.getItem('selectedSite'), 'getAllLevels').subscribe((data: any) => {
      this.allLev=data;
    }, (error) => {
      console.log(error);
    });
    this.GetAll();
  }
  
  initializeData()
  {
    this.AllRequestinfo = [];
    this.errorDataInfo = [];
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
    this.apiSubscriber[0] = this.apiservice.sendRequest(config['getLvlTmpMap'],this.currentQuery, 'getLvlTmpMap').subscribe((data: any) => {
      this.AllRequestinfo=data;
      if(this.AllRequestinfo[0]){
        this.UserDataCollumns=this.UserCollumnHeaders;
        // this.pagesTotal=Math.ceil(this.AllRequestinfo[0].TotalCount/this.currentQuery.PageSize);
        let bg_cell = ''
        this.AllRequestinfo.forEach((element:any,index:any) => {
          let ctz = element.CreatedDateTZ?" "+element.CreatedDateTZ:'';
          this.errorDataInfo.push([
            {value:(index+1),bg:bg_cell},
            // {value:element.Id,bg:bg_cell},
            {value:element.LevelName,bg:bg_cell},
            {value:element.TemplateName,bg:bg_cell},
            {value:element.DepositAmtCriteria,bg:bg_cell},
            {value:element.BetAmtCriteria,bg:bg_cell},
            {value:element.UpgradeReward,bg:bg_cell},
            {value:element.DailyReward,bg:bg_cell},
            {value:element.WeeklyReward,bg:bg_cell},
            {value:element.MonthlyReward,bg:bg_cell},
            {value:element.BetTurnoverWegring,bg:bg_cell},
            {value:element.DepositWithdrawalTurnoverWegering,bg:bg_cell},
            {value:element.WithdrawalTurnoverWegering,bg:bg_cell},
            {value:element.DayFreq,bg:bg_cell},
            {value:element.WeekFreq,bg:bg_cell},
            {value:element.MonthFreq,bg:bg_cell},
            {value:element.DailyDepositAmount,bg:bg_cell},
            {value:element.WeeklyDepositAmount,bg:bg_cell},
            {value:element.MonthlyDepositAmount,bg:bg_cell},
            {value:element.CreatedDate?moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
            {value:element.UpdatedDate?moment(element.UpdatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
            {value:'',bg:'white-cell',icon:'feather',iconvalue:'edit-2'}
          ])
        });
        this.rowCount={f:this.errorDataInfo[0][0].value,l:this.errorDataInfo[this.errorDataInfo.length-1][0].value,t:this.AllRequestinfo[0].TotalCount};
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
  
  onValueChange(formVal:any){
    if(formVal.type=='edit-2'){
      this.udataToView=this.AllRequestinfo[formVal.row];
      this.EditOpenPopup();
    }
  }

  EditOpenPopup() {
    let dialogRef = this.dialog.open(this.EditDialogOpen, {
      width: '1280px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {})
  }
  
  getSearchQuery(formVal:any)
  {
    this.currentQuery.WalletTypeId=formVal.C0;
    this.currentQuery.TemplateId=formVal.C1;
    console.log(formVal);
    this.GetAll();
  }
  
  selWal(formVal:any)
  {
    let mTmp = this.allTmp.find((wal: { WalletTypeId: any; }) => wal.WalletTypeId == formVal.C0);
    if(mTmp&&mTmp.WalletwsList[0]){
      this.defTmp=mTmp.WalletwsList.map(({ Id, Name }: { Id: number; Name: string }) => ({ name: Name, value: Id }));
      this.dynamicControls[1].options=this.defTmp;
    }
    else{
      this.dynamicControls[1].options=[];
    }
  }
  
  openPopup() {
    let dialogRef = this.dialog.open(this.addForm, {
      width: '1280px',
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