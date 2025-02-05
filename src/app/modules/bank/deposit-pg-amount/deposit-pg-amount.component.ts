import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import { Subscription } from 'rxjs';
// import { element } from 'protractor';

import { ModulesModule } from '@modules/modules/modules.module';
import { BankModule } from '../bank.module';

@Component({
  selector: 'app-deposit-pg-amount',
  imports: [
    ModulesModule,
    // BankModule
  ],
  templateUrl: './deposit-pg-amount.component.html',
  styleUrl: './deposit-pg-amount.component.scss'
})
export class DepositPgAmountComponent implements OnInit {
  @ViewChild('UDataDialogOpen') UDataDialogOpen!: TemplateRef<any>;
  @ViewChild('ApproveDialogOpen') ApproveDialogOpen!: TemplateRef<any>;
  AllPGinfo:any=[];
  PGinfoData:any=[];
  levelId: any = 0
  currentPG:any={};
  PGCollumnHeaders:any = [
    [{value:'Sr. No.',bg:'white-drop'},{value:'Status',bg:'white-drop'},{value:'Amount',bg:'white-drop'},{value:'Bonus Percentage',bg:'white-drop'},{value:'Sorting',bg:'white-drop'}]
  ];
  PGDataCollumns=this.PGCollumnHeaders;
  PGCollumnLoading = false;
  private loaderSubscriber!: Subscription;
  dynamicControls: { type: string; changeAction: string; default: { name: string; value: string }; options: { name: string; value: any }[] }[] = [
    {type:'select',changeAction:"submit",default:{name:'Select',value:''},options:[]}
  ];
  currentQuery={"Search": "","SiteCode":sessionStorage.getItem('selectedSite'),"WalletTypeId":sessionStorage.getItem('WalChosen')};
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService,private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.PGCollumnLoading=('depositmapping' in loading)?true:false;
  });
    this.GetAllPG();
    this.GetAllLevel();
  }
  
  initializeData()
  {
    this.AllPGinfo = [];
    this.PGinfoData = [];
  }
  getSearchQuery(){
    this.levelId = 1;
    this.GetAllPG();
  }

  GetAllPG() {
    this.initializeData();
    // let param='?WalletTypeId='+sessionStorage.getItem('WalChosen')+'&LevelId=';

    // this.levelId added by shaunak
    let param='?WalletTypeId='+sessionStorage.getItem('WalChosen')+'&LevelId='+this.levelId;

    this.apiservice.getRequest(config['depositmapping']+param,'depositmapping').subscribe((data: any) => {
      this.AllPGinfo=data;
      if(this.AllPGinfo[0]){
        this.PGDataCollumns=this.PGCollumnHeaders;
        this.AllPGinfo.forEach((element:any,index:any) => {
          let ctz = element.CreatedDateTZ?" "+element.CreatedDateTZ:'';
          this.PGinfoData.push([
            {value:index+1,bg:'white-cell'},
            {value:element.StatusId,bg:'white-cell',icon:'Toggle'},
            {value:element.Amount,bg:'white-cell break-class'},
            {value:element.BonusPercentage,bg:'white-cell'},
            {value:element.Sorting,bg:'white-cell'},
            // {value:element.CreatedDate?moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
          ])
        });
      }
      else{
        this.PGDataCollumns=this.utilities.TableDataNone;
      }
    }, (error) => {
      this.PGCollumnLoading = false;
      console.log(error);
    });
  }

  onValueChange(InpVal:any){
    if(InpVal.col==1 && InpVal.type=='Toggle'){
      this.currentPG=this.AllPGinfo[InpVal.row];
      this.PGinfoData[InpVal.row][InpVal.col].icon='Loading';
      this.ChangePGStatus(InpVal)
    }
  }

  ChangePGStatus(InpVal:any){
    let param = config['changePGStatus'] + '?depositAmountId='+this.currentPG.MappingId;
    this.apiservice.getRequest(param,'changePGStatus').subscribe((data: any) => {
      if(data.ErrorCode=='1'){
        this.utilities.toastMsg("success", "Success", data.ErrorMessage);
        this.PGinfoData[InpVal.row][InpVal.col].value=InpVal.value?1:0;
        this.PGinfoData[InpVal.row][InpVal.col].icon='Toggle';
      }
      else{
        this.utilities.toastMsg("error", "Error", data.ErrorMessage);
        this.PGinfoData[InpVal.row][InpVal.col].icon='Toggle';
      }
    }, (error) => {
      this.utilities.toastMsg("error", "Can not process", '');
      console.log(error);
    });
  }
  GetAllLevel(){
    this.apiservice.sendRequest(config['getVLevMst'],this.currentQuery,'getVLevMst').subscribe((data: any) => {
      data.forEach(((element: { Name: any; LevelNumber: any; })=>{
          this.dynamicControls[0].options.push({'name':element.Name,value:element.LevelNumber})
      }));
    }, (error) => {
      this.utilities.toastMsg("error", "Can not process", '');
      console.log(error);
    });
  }

  ngOnDestroy(){
    if (this.loaderSubscriber) {
      this.loaderSubscriber.unsubscribe();
    }
  }
}
