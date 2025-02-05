import { Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-spinwheel',
  imports: [
    ModulesModule,
  ],
  templateUrl: './spinwheel.component.html',
  styleUrl: './spinwheel.component.scss'
})
export class SpinwheelComponent implements OnInit {
  AllSpininfo:any=[];
  spinData:any=[];
  rowCount: any ={f:0,l:0,t:0};
  pageCount=[10,50,100,500,1000];
  pagesTotal=1;
  paginatorBlock:any=[];
  userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
  dynamicControls = [
    {changeAction:'submit',que:'wallet',type:'dropdown',default:parseInt(sessionStorage.getItem('WalChosen')||'{}'),options:this.userWals.map(({Id, Name, Code}:{Id: any; Name: any; Code: any;}) => ({ op:Name+' - '+Code, val:Id })),subque:[]}
  ];

  UserCollumnHeaders:any = [
    [{value:'Sr. No.',bg:'white-drop'},
    {value:'Status',bg:'white-drop'},
    {value:'Title',bg:'white-drop'},
    {value:'Description',bg:'white-drop'},
    {value:'Amount',bg:'white-drop'},
    {value:'CreatedDate',bg:'white-drop'}
  ]
  ]
  UserDataCollumns=this.UserCollumnHeaders;
  UserCollumnLoading = false;
  currentQuery={"PageNo": 1,"PageSize": this.pageCount[0],"SiteCode": sessionStorage.getItem('selectedSite'),"WalletTypeId":sessionStorage.getItem('WalChosen')};
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService) { }
  
  ngOnInit(): void {
    this.GetAllUsers();
  }
  
  initializeData()
  {
    this.UserCollumnLoading = true;
    this.AllSpininfo = [];
    this.spinData = [];
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
    this.apiservice.sendRequest(config['getSpinWheels'], this.currentQuery).subscribe((data: any) => {
      this.UserCollumnLoading = false;
      this.AllSpininfo=data;
      if(this.AllSpininfo[0]){
        this.UserDataCollumns=this.UserCollumnHeaders;
        this.pagesTotal=Math.ceil(this.AllSpininfo[0].TotalCount/this.currentQuery.PageSize);
        this.AllSpininfo.forEach((element:any,index:any) => {
          let ctz = element.CreatedDateTZ?" "+element.CreatedDateTZ:'';
          this.spinData.push([
          {value:((this.currentQuery.PageNo-1)*this.currentQuery.PageSize)+(index+1),bg:'white-cell'},
          {value:element.IsActive,bg:'white-cell',icon:'Toggle'},
          {value:element.Title,bg:'white-cell'},
          {value:element.Description,bg:'white-cell'},
          {value:element.CurrencyType+' '+this.utilities.roundOffNum(element.Amount),bg:'white-cell'},
          {value:element.CreatedDate?moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'}
          ])
        });
        this.rowCount={f:this.spinData[0][0].value,l:this.spinData[this.spinData.length-1][0].value,t:this.AllSpininfo[0].TotalCount};
        this.setPaginator();
      }
      else{
        this.rowCount={f:0,l:0,t:0};
        this.UserDataCollumns=this.utilities.TableDataNone;
      }
    }, (error) => {
      this.UserCollumnLoading = false;
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
  currentSP:any={};
  onValueChange(InpVal:any){
    if(InpVal.type=='Toggle'){
      this.currentSP=this.AllSpininfo[InpVal.row];
      this.spinData[InpVal.row][InpVal.col].icon='Loading';
      this.ChSpinStatus(InpVal)
    }
  }

  ChSpinStatus(InpVal:any){
    let param = config['chSpMstStat'] + '?Id='+this.currentSP.Id;
    this.apiservice.getRequest(param,'chSpMstStat').subscribe((data: any) => {
      if(data.ErrorCode=='1'){
        this.utilities.toastMsg("success", "Success", data.ErrorMessage);
        this.spinData[InpVal.row][InpVal.col].value=InpVal.value?1:0;
        this.spinData[InpVal.row][InpVal.col].icon='Toggle';
      }
      else{
        this.utilities.toastMsg("error", "Error", data.ErrorMessage);
        this.spinData[InpVal.row][InpVal.col].icon='Toggle';
      }
    }, (error) => {
      this.utilities.toastMsg("error", "Can not process", '');
      console.log(error);
    });
  }
  
  getSearchQuery(formVal:any){
    this.currentQuery.PageNo = 1;
    this.currentQuery.WalletTypeId = formVal.wallet.value;
    sessionStorage.setItem('WalChosen',formVal.wallet.value);
    this.GetAllUsers();
  }
}