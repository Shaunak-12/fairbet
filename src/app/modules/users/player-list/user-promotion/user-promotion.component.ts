import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModulesModule } from '@modules/modules/modules.module';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { config } from '@services/config';
import { Subscription } from 'rxjs'; EventEmitter

@Component({
  selector: 'app-user-promotion',
  imports: [
    ModulesModule,
  ],
  templateUrl: './user-promotion.component.html',
  styleUrl: './user-promotion.component.scss'
})
export class UserPromotionComponent implements OnInit, OnDestroy {
  @Input() uWalId: any;
  @Input() userData: any;
  @Output() onCancel = new EventEmitter<any>();
  category: any = []
  subCategory: any = []
  addForm!: FormGroup;

  UserCollumnLoading = false;
  rowCount:any = { f: 0, l: 0, t: 0 };
  pageCount = [10, 50, 100, 500, 1000];
  pagesTotal = 1;
  paginatorBlock: any = [];
  UserCollumnHeaders: any = [
    [{ value: 'Sr. No.', bg: 'white-drop' }, { value: 'Id', bg: 'white-drop' }, { value: 'Code', bg: 'white-drop' }, { value: 'Status', bg: 'white-drop' }]
  ]
  UserDataCollumns: { value: string; bg: string; }[][] = [];
  AllUserpromo: any = [];
  UserpromoData: any = [];
  dIndex={status:{row:0,col:0,use:false}};
  currentQuery = { "Search": "", "PageNo": 1, "PageSize": this.pageCount[0], "SiteCode": sessionStorage.getItem('selectedSite'), "WalletTypeId": sessionStorage.getItem('WalChosen'), "PlayerId": "" };
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[] = [];
  constructor(private formBuilder: FormBuilder, private apiSer: ApiService, private utilities: CommonFunctionService) { }

  ngOnInit(): void {
    this.GetAllPromo();
    this.loaderSubscriber = this.apiSer.loaderService.loading$.subscribe((loading: any = {}) => {
      this.UserCollumnLoading=('userPromo' in loading)?true:false;
        if(this.dIndex.status.use)
      {
        this.UserpromoData[this.dIndex.status.row][this.dIndex.status.col].icon=('updatePromo' in loading)?'Loading':'Toggle';
      }
    });
  }
  onPaginatorChange(paginatorQuery: any) {
    if (paginatorQuery.action == 'pageSize') {
      this.currentQuery.PageNo = 1;
      this.currentQuery.PageSize = paginatorQuery.pageSize;
    }
    else if (paginatorQuery.action == 'pageNo') {
      this.currentQuery.PageNo = paginatorQuery.pageNo;
    }
    this.GetAllPromo();
  }

  initializeData() {
    this.UserCollumnLoading = true;
    this.AllUserpromo = [];
    this.UserpromoData = [];
    if (this.apiSubscriber[0]) {
      this.apiSubscriber[0].unsubscribe();
    }
  }
  GetAllPromo() {
    this.initializeData();
    let param = '?creditAccountId='+this.userData.CreditAccountId
    this.apiSer.getRequest(config['userPromo']+param, 'userPromo').subscribe((data: any) => {
      this.AllUserpromo = data;
      if (this.AllUserpromo[0]) {
        this.UserDataCollumns = this.UserCollumnHeaders;
        this.AllUserpromo.forEach((element: any, index: any) => {
          this.UserpromoData.push([
            { value: index + 1, bg: 'white-cell' },
            { value: element.PromotionId, bg: 'white-cell' },
            { value: element.PromotionCode, bg: 'white-cell' },
            { value: element.StatusId, bg: 'white-cell', icon: 'Toggle' }
          ])
        });
      }
      else {
        this.UserDataCollumns = this.utilities.TableDataNone;
      }
    }, (error) => {
      console.error(error);
    });
  }

  onBack() {

  }
  onValueChange(formVal: any) {
    if(formVal.type=='Toggle'){
      this.dIndex.status.row=formVal.row;
      this.dIndex.status.col=formVal.col;
      this.dIndex.status.use=true;
      let promid = this.AllUserpromo[formVal.row].PromotionId;
      this.ChangePromo(promid);
    }
  }
  ChangePromo(promid:any){
    let param = '?creditAccountId='+this.userData.CreditAccountId+'&promotionId='+promid+'&userId='+this.userData.UserId;
    this.apiSer.getRequest(config['updatePromo']+param, 'updatePromo').subscribe(
      (data:any)=> {
        if(data.ErrorCode == '1'){
          this.utilities.toastMsg('success',data.Result,data.ErrorMessage);
          this.UserpromoData[this.dIndex.status.row][this.dIndex.status.col].value=!this.UserpromoData[this.dIndex.status.row][this.dIndex.status.col].value;
          // this.GetAllPromo();
        }else{
          this.utilities.toastMsg('warning',data.Result,data.ErrorMessage);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  ngOnDestroy(): void {
    if (this.loaderSubscriber) {
      this.loaderSubscriber.unsubscribe();
    }
    if (this.apiSubscriber[0]) {
      this.apiSubscriber[0].unsubscribe();
    }
  }

}
