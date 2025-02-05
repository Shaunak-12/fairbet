import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import {FormControl} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModulesModule } from '@modules/modules/modules.module';
import { AddReelComponent } from '../reels/add-reel/add-reel.component';
import { ApproveReelComponent } from '../reels/approve-reel/approve-reel.component';

@Component({
  selector: 'app-dc-promotion',
  imports: [
    ModulesModule,
    AddReelComponent,ApproveReelComponent
  ],
  templateUrl: './dc-promotion.component.html',
  styleUrl: './dc-promotion.component.scss'
})
export class DcPromotionComponent implements OnInit, OnDestroy {
  @ViewChild('AddReelDialogopen') AddReelDialogopen!: TemplateRef<any>;
  @ViewChild('ApproveReelDialogOpen') ApproveReelDialogOpen!: TemplateRef<any>;
  AllDCPinfo:any=[];
  DCPinfoData:any=[];
  pageId: number;
  pageName: string | null;
  pgVCount: { id: any; view: any }[] = [];
  VCountNo = 0;
  VCountDisplay = '0';
  TVCD = '0';
  AcceptRejectVar = '';
  pdataToView = {};
  PriceOps=new FormControl(2000);
  PriceTotal=0;
  PriceDisplay = '0'
  customPrice=new FormControl(0);
  
  DCPCollumnHeaders:any = [
    [
      {value:'Sr. No.',bg:'white-drop'},
      {value:'Count',bg:'white-drop'},
      {value:'Id',bg:'white-drop'},
      {value:'Video',bg:'white-drop'},
      {value:'URL',bg:'white-drop'},
      {value:'Description',bg:'white-drop'},
      {value:'Upload Date',bg:'white-drop'},
      {value:'View Count',bg:'white-drop'},
      {value:'Created Date',bg:'white-drop'},
      {value:'View',bg:'white-drop'},
      {value:'Status',bg:'white-drop'}
    ]
  ];
  DCPDataCollumns=this.DCPCollumnHeaders;
  DCPCollumnLoading = false;
  private loaderSubscriber!: Subscription;
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService, private route: ActivatedRoute, private dialog: MatDialog) {
    this.pageId = ((parseInt(this.route.snapshot.paramMap.get('id') || '') - parseInt(this.route.snapshot.paramMap.get('extrabit') || '')) / 3);
    this.pageName = this.route.snapshot.paramMap.get('pname');
  }
  
  ngOnInit(): void {
    this.PriceOps.valueChanges.subscribe(value=>{
      if(value!=1){
        this.customPrice.setValue(1);
      }
      this.PriceTotal = parseFloat(((value ?? 0) * (this.VCountNo/1000000)).toFixed(2));
      this.PriceDisplay = this.utilities.roundOffNum(this.PriceTotal);
    });
    this.customPrice.valueChanges.subscribe(value=>{
      this.PriceTotal = parseFloat(((value ?? 0) * (this.VCountNo/1000000)).toFixed(2));
      this.PriceDisplay = this.utilities.roundOffNum(this.PriceTotal);
    });
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.DCPCollumnLoading=('getDCPromotionbyPage' in loading)?true:false;
    });
    this.GetAllDCP();
  }
  
  initializeData()
  {
    this.AllDCPinfo = [];
    this.DCPinfoData = [];
    this.TVCD = '0';
  }
  
  GetAllDCP() {
    this.initializeData();
    let param='?PId='+this.pageId+'&SiteCode='+sessionStorage.getItem('selectedSite');
    this.apiservice.getRequest(config['getDCPromotionbyPage']+param,'getDCPromotionbyPage').subscribe((data: any) => {
      this.AllDCPinfo=data;
      if(this.AllDCPinfo[0]){
        this.DCPDataCollumns=this.DCPCollumnHeaders;
        let TVCDcount = 0;
        this.AllDCPinfo.forEach((element:any,index:any) => {
          let ctz = element.CreatedDateTZ?" "+element.CreatedDateTZ:'';
          this.DCPinfoData.push([
            {value:index+1,bg:'white-cell'},
            {value:'',bg:'white-cell',icon:'Checkbox'},
            {value:element.Id,bg:'white-cell'},
            {value:element.ImageUrl?element.ImageUrl:'assets/img/soc_load.jpg',bg:'white-cell',icon:'Image',height:'11',width:'6',rounded:0.3},
            {value:element.URL,bg:'white-cell',sufText:element.Handle},
            {value:element.Description?(element.Description).slice(0,100)+' ...':'',bg:'white-cell'},
            {value:element.UploadDate?moment(element.UploadDate).format("h:mm:ss A, DD-MMM-yyyy"):'',bg:'white-cell'},
            {value:this.utilities.abbreviateNumber(element.ViewCount),bg:'white-cell'},
            {value:element.CreatedDate?moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy")+ctz:'',bg:'white-cell'},
            {value:'',bg:'white-cell',icon:'View'},
            {bg:'white-cell',icon:'Multi',value:[
              ...(element.Status=='Pending'?[{value:'Approve',bg:'white-cell',icon:'None'},{value:'Reject',bg:'white-cell',icon:'None'}]:[{value:element.Status,bg:'white-cell'}])
            ]
            }
          ])
          TVCDcount += element.ViewCount;
        });
        this.TVCD = this.utilities.abbreviateNumber(TVCDcount);
      }
      else{
        this.DCPDataCollumns=this.utilities.TableDataNone;
      }
    }, (error) => {
      this.DCPCollumnLoading = false;
      console.log(error);
    });
  }
  
  onValueChange(formVal:any){
    if(formVal.col==1 && formVal.type){
      this.pgVCount.push({id:this.AllDCPinfo[formVal.row].Id,view:this.AllDCPinfo[formVal.row].ViewCount});
      this.VCountNo = this.pgVCount.reduce((accumulator, obj) => accumulator + obj['view'], 0);
      this.VCountDisplay = this.utilities.abbreviateNumber(this.VCountNo);
      this.PriceTotal = this.PriceOps.value! != 1 ? this.PriceOps.value! * parseFloat((this.VCountNo / 1000000).toFixed(2)) : this.customPrice.value! * parseFloat((this.VCountNo / 1000000).toFixed(2));
      this.PriceDisplay = this.utilities.roundOffNum(this.PriceTotal);
    }
    else if(formVal.col==1 && !formVal.type){
      this.pgVCount = this.pgVCount.filter(obj => obj['id'] !== this.AllDCPinfo[formVal.row].Id);
      this.VCountNo = this.pgVCount.reduce((accumulator, obj) => accumulator + obj['view'], 0);
      this.VCountDisplay = this.utilities.abbreviateNumber(this.VCountNo);
      this.PriceTotal = this.PriceOps.value! != 1 ? this.PriceOps.value! * parseFloat((this.VCountNo/1000000).toFixed(2)) : this.customPrice.value! * parseFloat((this.VCountNo/1000000).toFixed(2));
      this.PriceDisplay = this.utilities.roundOffNum(this.PriceTotal);
    }
    if(formVal.col==3 && formVal.type=='Image'){
      window.open('https://www.instagram.com/reel/'+this.AllDCPinfo[formVal.row].URL+'/', '_blank');
    }
    if(formVal.col==9 && formVal.type=='View'){
      let extrabit = Math.floor(Math.random() * 20) + 1;
      window.open('/creator/reel-history/'+(this.AllDCPinfo[formVal.row].Id * 3 + extrabit)+'/'+extrabit+'/'+this.AllDCPinfo[formVal.row].DCPageName+'/'+this.AllDCPinfo[formVal.row].URL, '_blank');
    }
    if(formVal.col==10 && formVal.type=='Approve'){
      this.AcceptRejectVar="A";
      this.pdataToView=this.AllDCPinfo[formVal.row];
      this.ApproveOpenPopup();
    }
    if(formVal.col==10 && formVal.type=='Reject'){
      this.AcceptRejectVar="R";
      this.pdataToView=this.AllDCPinfo[formVal.row];
      this.ApproveOpenPopup();
    }
  }

  goPage(){
    window.open('https://www.instagram.com/'+this.pageName+'/reels/','_blank')
  }

  ApproveOpenPopup() {
    let dialogRef = this.dialog.open(this.ApproveReelDialogOpen, {
      height: '900x',
      width: '600px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {})
  }

  AddPageOpenPopup() {
    let dialogRef = this.dialog.open(this.AddReelDialogopen, {
      width: '800px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {});
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