import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { Subscription } from 'rxjs';
import moment from 'moment';
import { ModulesModule } from '@modules/modules/modules.module';
import { AddFormTempComponent } from './add-form-temp/add-form-temp.component';

@Component({
  selector: 'app-template',
  imports: [
    ModulesModule,
    AddFormTempComponent
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent implements OnInit {
  @ViewChild('addForm') addForm!: TemplateRef<any>;
  AllTmpInfo:any=[];
  tmpDatInfo:any=[];
  rowCount: any ={f:0,l:0,t:0};
  pageCount=[10,50,100,500,1000];
  pagesTotal=1;
  udataToView: { Id?: number } = {};
  AcceptRejectVar="A";
  paginatorBlock:any=[];
  userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
  defWal=this.userWals.filter((wal: { Id: number; }) => wal.Id == parseInt(sessionStorage.getItem('WalChosen')||'{}'))[0];
  allGrp:any=[];
  defGrp:any=[];
  dynamicControls = [
    {changeAction:'submit',type:'select',default:{name:this.defWal.Name+'-'+this.defWal.Code,value:this.defWal.Id},options:this.userWals.filter(({Id}:{Id: any;})=>Id!==this.defWal.Id).map(({Id,Name,Code}:{Id: any; Name: any;Code: any;})=>({name:Name+'-'+Code,value:Id}))},
    {placeholder:'Search',type:'text',label:'Search'}
  ];
  UserCollumnHeaders:any = [[{value:'Sr. No.',bg:'white-drop'},{value:'Status',bg:'white-drop'},{value:'Id',bg:'white-drop'},{value:'Name',bg:'white-drop'},{value:'Group Name',bg:'white-drop'},{value:'Created Date',bg:'white-drop'},{value:'Updated Date',bg:'white-drop'}]];
  dIndex={status:{row:0,col:0,use:false}}
  UserDataCollumns=this.UserCollumnHeaders;
  currentQuery={"Search": "","SiteCode":sessionStorage.getItem('selectedSite'),"WalletTypeId":sessionStorage.getItem('WalChosen')};
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[]=[];
  apiLoader={crc_list:false};
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService,private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.apiLoader.crc_list=('getVTmpMst' in loading)?true:false;
      if (this.dIndex.status.use) {
        if ( this.tmpDatInfo && this.tmpDatInfo[this.dIndex.status.row] && this.tmpDatInfo[this.dIndex.status.row][this.dIndex.status.col] ) {
          const errorInfo = this.tmpDatInfo[this.dIndex.status.row][this.dIndex.status.col];
          errorInfo['loader'] = 'setTmpName' in loading ? true : false;
        }
      }
    });
    this.apiSubscriber[0] = this.apiservice.getRequest(config['getAllGroups']+"?SiteCode="+sessionStorage.getItem('selectedSite'), 'getAllGroups').subscribe((data: any) => {
      this.allGrp=data;
    }, (error) => {
      console.log(error);
    });
    this.GetAll();
  }
  
  initializeData()
  {
    this.AllTmpInfo = [];
    this.tmpDatInfo = [];
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
    this.apiSubscriber[0] = this.apiservice.sendRequest(config['getVTmpMst'],this.currentQuery, 'getVTmpMst').subscribe((data: any) => {
      this.AllTmpInfo=data;
      if(this.AllTmpInfo[0]){
        this.UserDataCollumns=this.UserCollumnHeaders;
        // this.pagesTotal=Math.ceil(this.AllTmpInfo[0].TotalCount/this.currentQuery.PageSize);
        let bg_cell = ''
        this.AllTmpInfo.forEach((element:any,index:any) => {
          let ctz = element.CreatedDateTZ?" "+element.CreatedDateTZ:'';
          this.tmpDatInfo.push([
            {value:(index+1),bg:bg_cell},
            {value:element.IsActive,bg:'white-cell',icon:'Toggle'},
            {value:element.Id,bg:bg_cell},
            {value:element.Name,bg:'white-cell',icon:'Textarea',loader:false},
            {value:element.GroupName,bg:bg_cell},
            {value:element.CreatedDate?moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
            {value:element.UpdatedDate?moment(element.UpdatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
          ])
        });
        this.rowCount={f:this.tmpDatInfo[0][0].value,l:this.tmpDatInfo[this.tmpDatInfo.length-1][0].value,t:this.AllTmpInfo[0].TotalCount};
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
  
  curT:any={};
  
  
  onValueChange(InpVal:any){
    if(InpVal.type=='Toggle'){
      this.curT=this.AllTmpInfo[InpVal.row];
      this.tmpDatInfo[InpVal.row][InpVal.col].icon='Loading';
      this.ChangeTemplateStatus(InpVal)
    }
    else if(InpVal.type=="Textarea"){
      this.dIndex.status.use = true;
      this.dIndex.status.row = InpVal.row;
      this.dIndex.status.col = InpVal.col;
      this.udataToView=this.AllTmpInfo[InpVal.row];
      let param = {
        "Id":this.udataToView['Id'],
        "Name":InpVal.value,
      }
      this.setGroupName(param);
    }
  }
  
  setGroupName(param:any){
    let gpar = this.utilities.setForGetNew(param)
    this.apiservice.getRequest(config['setTmpName']+gpar,'setTmpName').subscribe((data: any)=>{
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
  
  ChangeTemplateStatus(InpVal:any){
    let param = config['setTmpStat'] + '?Id='+this.curT.Id;
    this.apiservice.getRequest(param,'setTmpStat').subscribe((data: any) => {
      if(data.ErrorCode=='1'){
        this.utilities.toastMsg("success", "Success", data.ErrorMessage);
        this.tmpDatInfo[InpVal.row][InpVal.col].value=InpVal.value?1:0;
        this.tmpDatInfo[InpVal.row][InpVal.col].icon='Toggle';
      }
      else{
        this.utilities.toastMsg("error", "Error", data.ErrorMessage);
        this.tmpDatInfo[InpVal.row][InpVal.col].icon='Toggle';
      }
    }, (error) => {
      this.utilities.toastMsg("error", "Can not process", '');
      console.log(error);
    });
  }
 
  getSearchQuery(formVal:any)
  {
    this.currentQuery.Search=formVal.C1;
    this.currentQuery.WalletTypeId=formVal.C0;
    console.log(formVal);
    this.GetAll();
  }

  selWal(formVal:any)
  {
    console.log(formVal);
    let mGroup = this.allGrp.find((wal: { WalletTypeId: any; }) => wal.WalletTypeId == formVal.C0);
    console.log(mGroup);
    if(mGroup&&mGroup.WalletwsList[0]){
      this.defGrp=mGroup.WalletwsList.map(({ Id, Name }:{ Id: any; Name:any; }) => ({ name: Name, value: Id }));
      console.log(this.defGrp[0]);
      this.dynamicControls[1].default=this.defGrp[0];
      this.dynamicControls[1].options=this.defGrp.filter(({value}: { value: any }) => value !== this.defGrp[0].value);
      console.log(this.dynamicControls[1]);
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