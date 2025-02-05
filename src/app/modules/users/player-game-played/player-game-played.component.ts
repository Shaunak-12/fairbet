import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-player-game-played',
  imports: [
    ModulesModule
  ],
  templateUrl: './player-game-played.component.html',
  styleUrl: './player-game-played.component.scss'
})
export class PlayerGamePlayedComponent implements OnInit, OnDestroy {
  @Input() userId!:number;
  @Input() uWalId:any;
  AllUserinfo:any=[];
  UserinfoData:any=[];
  rowCount: any ={f:0,l:0,t:0};
  pagesTotal=1;
  paginatorBlock:any=[];
  dynamicControls = [{placeholder:'Search',type:'text',label:'Search'}];
  UserCollumnHeaders:any = [
    [{value:'Sr. No.',bg:'white-drop'},{value:'Image',bg:'white-drop'},{value:'Game',bg:'white-drop'},{value:'Product',bg:'white-drop'},
    {value:'Token',bg:'white-drop'},{value:'Device',bg:'white-drop'},{value:'Ip',bg:'white-drop'},{value:'Date',bg:'white-drop'}]
  ];
  UserDataCollumns=this.UserCollumnHeaders;
  currentQuery: any ={"PageNo": 1,"PageSize":10};
  currentWal = sessionStorage.getItem('WalChosen');
  
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[]=[];
  apiLoader={pgpc_list:false,pdc_eStatement:false,pdc_eDAW:false};
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService) { }
  
  ngOnInit(): void {
    this.currentWal=this.uWalId;
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.apiLoader.pgpc_list=('getGamePlayed' in loading)?true:false;
    });
    this.GetUserStatement(this.currentWal);
  }
  
  initializeData()
  {
    this.AllUserinfo = [];
    this.UserinfoData = [];
  }
  
  GetUserStatement(userselWal:any) {
    this.initializeData();
    this.currentWal=userselWal;
    let param = "?PageNo=" + this.currentQuery.PageNo + "&UserId=" + this.userId+'&WalletTypeId='+userselWal;
    this.apiSubscriber[0] = this.apiservice.getRequest(config['getGamePlayed'] + param,'getGamePlayed').subscribe((data: any) => {
      this.AllUserinfo=data;
      if(this.AllUserinfo[0]){
        this.UserDataCollumns=this.UserCollumnHeaders;
        this.pagesTotal=Math.ceil(this.AllUserinfo[0].TotalCount/this.currentQuery.PageSize);
        this.AllUserinfo.forEach((element:any,index:any) => {
          this.UserinfoData.push([
            {value:((this.currentQuery.PageNo-1)*this.currentQuery.PageSize)+(index+1),bg:'white-cell'},
            {value:element.ImageUrl,bg:'white-cell',icon:'Image',height:'4',width:'4',rounded:0},
            {value:element.GameName,bg:'white-cell'},
            {value:element.Product,bg:'white-cell'},
            {value:element.Token,bg:'white-cell'},
            {value:element.Platform,bg:'white-cell'},
            {value:element.Ip,bg:'white-cell'},
            {value:element.CreatedDate?moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy")+" "+element.CreatedDateTZ:'',bg:'white-cell',sufText:element.TimeAgo}
          ])
        });
        this.rowCount={f:this.UserinfoData[0][0].value,l:this.UserinfoData[this.UserinfoData.length-1][0].value,t:this.AllUserinfo[0].TotalCount};
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
  
  onPaginatorChange(paginatorQuery:any){
    if(paginatorQuery.action=='pageSize'){
      this.currentQuery.PageNo = 1;
      this.currentQuery.PageSize = paginatorQuery.pageSize;
    }
    else if(paginatorQuery.action=='pageNo'){
      this.currentQuery.PageNo = paginatorQuery.pageNo;
    }
    this.GetUserStatement(this.currentWal);
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
  
  ngOnDestroy(): void {
    if (this.loaderSubscriber) {
      this.loaderSubscriber.unsubscribe();
    }
    if(this.apiSubscriber[0]) {
      this.apiSubscriber[0].unsubscribe();
    }
  }
}