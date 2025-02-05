import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { Subscription } from 'rxjs';
import moment from 'moment';
import { ModulesModule } from '@modules/modules/modules.module';
import { AddFormLevComponent } from './add-form-lev/add-form-lev.component';

@Component({
  selector: 'app-level',
  imports: [
    ModulesModule,
    AddFormLevComponent
  ],
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent implements OnInit {
  @ViewChild('addFormLev') addFormLev!: TemplateRef<any>;
  AllLevInfo:any=[];
  levDatInfo:any=[];
  rowCount: any ={f:0,l:0,t:0};
  pageCount=[10,50,100,500,1000];
  pagesTotal=1;
  udataToView: { Id?: string } = {};
  AcceptRejectVar="A";
  paginatorBlock:any=[];
  dynamicControls = [{placeholder:'Search',type:'text',label:'Search'}];
  UserCollumnHeaders:any = [
    [{value:'Sr. No.',bg:'white-drop'},{value:'Status',bg:'white-drop'},{value:'Id',bg:'white-drop'},{value:'Name',bg:'white-drop'},{value:'Level Number',bg:'white-drop'},{value:'Created Date',bg:'white-drop'},{value:'Updated Date',bg:'white-drop'}]
  ];
  dIndex={status:{row:0,col:0,use:false}}
  UserDataCollumns=this.UserCollumnHeaders;
  currentQuery={"Search": "","SiteCode":sessionStorage.getItem('selectedSite'),"WalletTypeId":sessionStorage.getItem('WalChosen')};
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[]=[];
  apiLoader={crc_list:false};
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService,private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.apiLoader.crc_list=('getVLevMst' in loading)?true:false;
      if (this.dIndex.status.use) {
        if (this.levDatInfo &&this.levDatInfo[this.dIndex.status.row] &&this.levDatInfo[this.dIndex.status.row][this.dIndex.status.col] ) {
          const errorInfo = this.levDatInfo[this.dIndex.status.row][this.dIndex.status.col];
          errorInfo['loader'] = 'setLevName' in loading ? true : false;
        }
      }
    });
    this.GetAll();
  }
  
  initializeData()
  {
    this.AllLevInfo = [];
    this.levDatInfo = [];
    this.udataToView = {};
    this.currentQuery.WalletTypeId=sessionStorage.getItem('WalChosen');
  }
  
  onPaginatorChange(paginatorQuery:any){
    if(paginatorQuery.action=='pageSize'){
    }
    else if(paginatorQuery.action=='pageNo'){
    }
    this.GetAll();
  }
  
  GetAll() {
    this.initializeData();
    this.apiSubscriber[0] = this.apiservice.sendRequest(config['getVLevMst'],this.currentQuery, 'getVLevMst').subscribe((data: any) => {
      this.AllLevInfo=data;
      if(this.AllLevInfo[0]){
        this.UserDataCollumns=this.UserCollumnHeaders;
        this.AllLevInfo.forEach((element:any,index:any) => {
          let ctz = element.CreatedDateTZ?" "+element.CreatedDateTZ:'';
          this.levDatInfo.push([
            {value:(index+1),bg:'white-cell'},
            {value:element.IsActive,bg:'white-cell',icon:'Toggle'},
            {value:element.Id,bg:'white-cell'},
            {value:element.Name ,bg:'white-cell',icon:'Textarea',loader:false},
            {value:element.LevelNumber,bg:'white-cell'},
            {value:element.CreatedDate?moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
            {value:element.UpdatedDate?moment(element.UpdatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
          ])
        });
        this.rowCount={f:this.levDatInfo[0][0].value,l:this.levDatInfo[this.levDatInfo.length-1][0].value,t:this.AllLevInfo[0].TotalCount};
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
      this.curL=this.AllLevInfo[InpVal.row];
      this.levDatInfo[InpVal.row][InpVal.col].icon='Loading';
      this.ChangeLevelStatus(InpVal)
    }
    else if(InpVal.type=="Textarea"){
      this.dIndex.status.use = true;
      this.dIndex.status.row = InpVal.row;
      this.dIndex.status.col = InpVal.col;
      this.udataToView=this.AllLevInfo[InpVal.row];
      let param = {
        "Id":this.udataToView['Id'],
        "Name":InpVal.value,
      }
      this.setGroupName(param);
    }
  }
  
  setGroupName(param:any){
    let gpar = this.utilities.setForGetNew(param)
    this.apiservice.getRequest(config['setLevName']+gpar,'setLevName').subscribe((data: any)=>{
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
    });
  }
  
  ChangeLevelStatus(InpVal:any){
    let param = config['setLevStat'] + '?Id='+this.curL.Id;
    this.apiservice.getRequest(param,'setLevStat').subscribe((data: any) => {
      if(data.ErrorCode=='1'){
        this.utilities.toastMsg("success", "Success", data.ErrorMessage);
        this.levDatInfo[InpVal.row][InpVal.col].value=InpVal.value?1:0;
        this.levDatInfo[InpVal.row][InpVal.col].icon='Toggle';
      }
      else{
        this.utilities.toastMsg("error", "Error", data.ErrorMessage);
        this.levDatInfo[InpVal.row][InpVal.col].icon='Toggle';
      }
    }, (error) => {
      this.utilities.toastMsg("error", "Can not process", '');
      console.log(error);
    });
  }
  
  
  getSearchQuery(formVal:any)
  {
    this.currentQuery.Search=formVal.C0;
    console.log(formVal);
    this.GetAll();
  }
  openPopup() {
    let dialogRef = this.dialog.open(this.addFormLev, {
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