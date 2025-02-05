import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { UpdateSmsComponent } from './update-sms/update-sms.component';
import { AddSmsComponent } from './add-sms/add-sms.component';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-sms-provider',
  imports: [
    ModulesModule,
    UpdateSmsComponent,
    AddSmsComponent
  ],
  templateUrl: './sms-provider.component.html',
  styleUrl: './sms-provider.component.scss'
})
export class SmsProviderComponent implements OnInit {
  @ViewChild('SmsproviderAdd') SmsproviderAdd!: TemplateRef<any>;
  @ViewChild('SmsproviderUpdate') SmsproviderUpdate!: TemplateRef<any>;
  smsInfoData:any=[];
  AllData:any=[];
  udataToView:any =[];
  TableCollumnHeaders:any = [
    [{value:'Sr. No.',bg:'white-drop'},{value:'URL',bg:'white-drop'},{value:'SMS Limit',bg:'white-drop'},{value:'Sent SMS Count',bg:'white-drop'},{value:'Description',bg:'white-drop'},{value:'Reset Date',bg:'white-drop'},{value:'Created By',bg:'white-drop'},{value:'Created Date',bg:'white-drop'},{value:'Updated By',bg:'white-drop'},{value:'Updated Date',bg:'white-drop'},{value:'Action',bg:'white-drop'}]
  ];
  TableDataCollumns=this.TableCollumnHeaders;
  CollumnLoading = false;
  private loaderSubscriber!: Subscription;
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService,private dialog: MatDialog) { }
  

  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.CollumnLoading=('smsProvider' in loading)?true:false;
  });
    this.GetAllData();
  }

  initializeData()
  {
    this.smsInfoData = [];
    this.AllData = [];
  }
  
  GetAllData() {
    this.initializeData();
    let param='?SiteCode='+sessionStorage.getItem('selectedSite');
    this.apiservice.getRequest(config['smsProvider']+param,'smsProvider').subscribe((data: any) => {
      this.smsInfoData=data;
      console.log(this.smsInfoData);
      if(this.smsInfoData[0]){
        this.TableDataCollumns=this.TableCollumnHeaders;
        this.smsInfoData.forEach((element:any,index:any) => {
          let ctz = element.CreatedDateTZ?" "+element.CreatedDateTZ:'';
          let utz = element.UpdatedDateTZ?" "+element.UpdatedDateTZ:'';
          this.AllData.push([
            {value:index+1,bg:'white-cell'},
            {value:element.ProviderUrl,bg:'white-cell'},
            {value:element.SMSLimit,bg:'white-cell '},
            {value:element.SentSMSCount,bg:'white-cell'},
            {value:element.Description,bg:'white-cell break-class'},
            {value:element.ResetDate?moment(element.ResetDate).format("h:mm:ss A, DD-MMM-yyyy"):'',bg:'white-cell'},
            {value:element.CreatedBy,bg:'white-cell'},
            {value:element.CreatedDate?moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
            {value:element.UpdatedBy,bg:'white-cell'},
            {value:element.UpdatedDate?moment(element.UpdatedDate).format("h:mm:ss A, DD-MMM-yyyy")+utz:'',bg:'white-cell'},
            {value:'Edit',bg:'white-cell',icon:'None'},
          ])
        });
      }
      else{
        this.TableDataCollumns=this.utilities.TableDataNone;
      }
    }, (error) => {
      this.CollumnLoading = false;
      console.log(error);
    });
  }
  onValueChange(formVal:any){
    if(formVal.col == 10){
      this.udataToView=this.smsInfoData[formVal.row];
      // this.udataToView['DOB'] = moment(this.udataToView['DOB']).format("yyyy-MM-DD");
      this.EditPlayerOpenPopup();
    }
  }
  EditPlayerOpenPopup(){

    let dialogRef = this.dialog.open(this.SmsproviderUpdate, {
      width: '800px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.closePopup();
    })
  }
  TrxOpenPopup() {
    let dialogRef = this.dialog.open(this.SmsproviderAdd, {
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
}