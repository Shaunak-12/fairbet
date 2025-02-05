import { ModulesModule } from '@modules/modules/modules.module';
import { NewdepopromoComponent } from './newdepopromo/newdepopromo.component';
import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-depositpromo',
  imports: [
    ModulesModule,
    NewdepopromoComponent,
  ],
  templateUrl: './depositpromo.component.html',
  styleUrl: './depositpromo.component.scss'
})
export class DepositpromoComponent implements OnInit, OnDestroy {
  @ViewChild('addForm') addForm!: TemplateRef<any>;
  @ViewChild('UDataDialogOpen') UDataDialogOpen!: TemplateRef<any>;
  @ViewChild('ApproveDialogOpen') ApproveDialogOpen!: TemplateRef<any>;
  AllPGinfo:any=[];
  PGinfoData:any=[];
  userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
  defWal=this.userWals.filter((wal:any) => wal.Id == parseInt(sessionStorage.getItem('WalChosen')||'{}'))[0];
  dynamicControls = [{changeAction:'submit',type:'select',default:{name:this.defWal.Name+'-'+this.defWal.Code,value:this.defWal.Id},options:this.userWals.filter(({Id}:{Id: any;})=>Id!==this.defWal.Id).map(({Id,Name,Code}:{Id: any;Name: any;Code:any;})=>({name:Name+'-'+Code,value:Id}))},
  {placeholder:'Search',type:'text',label:'Search'}];
  currentPG:any={};
  PGCollumnHeaders:any = [
    [{value:'Sr. No.',bg:'white-drop'},
    {value:'Is Active',bg:'white-drop'},
    {value:'Title',bg:'white-drop'},
    {value:'Promotion Code',bg:'white-drop'},
    {value:'Description',bg:'white-drop'},
    {value:'Cap Limit',bg:'white-drop'},
    {value:'Minimum Deposit Amount',bg:'white-drop'},
    {value:'Deposit Count',bg:'white-drop'},
    {value:'Exact Deposit Count',bg:'white-drop'},
    {value:'Deposit Amount',bg:'white-drop'},
    {value:'Deposit Percentage',bg:'white-drop'},
    {value:'Wagering',bg:'white-drop'},
    {value:'Category',bg:'white-drop'}
    ]
  ];
  PGDataCollumns=this.PGCollumnHeaders;
  PGCollumnLoading = false;
  private loaderSubscriber!: Subscription;
  currentQuery={"PromotionCode": "","SiteCode": sessionStorage.getItem('selectedSite'),"WalletTypeId":this.defWal.Id};
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService,private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.PGCollumnLoading=('getDepoPromo' in loading)?true:false;
  });
    this.GetAllPG();
  }
  
  initializeData()
  {
    this.AllPGinfo = [];
    this.PGinfoData = [];
  }
  getSearchQuery(formVal:any){
    this.currentQuery.WalletTypeId=formVal.C0;
    this.currentQuery.PromotionCode=formVal.C1;
    this.GetAllPG();
  }
  GetAllPG() {
    this.initializeData();
    let param = this.utilities.setForGetNew(this.currentQuery);
    this.apiservice.getRequest(config['getDepoPromo']+param,'getDepoPromo').subscribe((data: any) => {
      this.AllPGinfo=data;
      if(this.AllPGinfo[0]){
        this.PGDataCollumns=this.PGCollumnHeaders;
        this.AllPGinfo.forEach((element:any,index:any) => {
          let ctz = element.CreatedDateTZ?" "+element.CreatedDateTZ:'';
          this.PGinfoData.push([
            {value:index+1,bg:'white-cell'},
            {value:element.IsActive,bg:'white-cell',icon:'Toggle'},
            {value:element.Title,bg:'white-cell'},
            {value:element.PromotionCode,bg:'white-cell'},
            {value:element.Description,bg:'white-cell'},
            {value:element.CapLimit,bg:'white-cell'},
            {value:element.MinimumDepositAmount,bg:'white-cell'},
            {value:element.DepositCount,bg:'white-cell'},
            {value:element.ExactDepositCount,bg:'white-cell'},
            {value:element.DepositAmount,bg:'white-cell'},
            {value:element.DepositPercentage,bg:'white-cell'},
            {value:element.Wagering,bg:'white-cell'},
            {value:element.Category,bg:'white-cell'}
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
    if(InpVal.type=='Toggle'){
      this.currentPG=this.AllPGinfo[InpVal.row];
      this.PGinfoData[InpVal.row][InpVal.col].icon='Loading';
      this.ChangePGStatus(InpVal)
    }
  }

  ChangePGStatus(InpVal:any){
    let param = config['changeDepoPromoStat'] + '?Id='+this.currentPG.Id;
    this.apiservice.getRequest(param,'changeDepoPromoStat').subscribe((data: any) => {
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

  ngOnDestroy(){
    if (this.loaderSubscriber) {
      this.loaderSubscriber.unsubscribe();
    }
  }
}