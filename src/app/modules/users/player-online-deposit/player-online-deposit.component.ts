import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-player-online-deposit',
  imports: [
    ModulesModule,
  ],
  templateUrl: './player-online-deposit.component.html',
  styleUrl: './player-online-deposit.component.scss'
})
export class PlayerOnlineDepositComponent implements OnInit, OnDestroy {
  @Input() userId!: number;
  @Input() uWalId: any;
  AllUserinfo: any = [];
  UserinfoData: any = [];
  rowCount: any = { f: 0, l: 0, t: 0 };
  pagesTotal = 1;
  paginatorBlock: any = [];
  dynamicControls = [{ placeholder: 'Search', type: 'text', label: 'Search' }];
  UserCollumnHeaders: any = [
    [{ value: 'Sr. No.', bg: 'white-drop' }, { value: 'RequestId', bg: 'white-drop' }, { value: 'Amount', bg: 'white-drop' },
    { value: 'Name', bg: 'white-drop' }, { value: 'GatewayName', bg: 'white-drop' }, { value: 'TransactionId', bg: 'white-drop' },
    { value: 'ReferenceId', bg: 'white-drop' }, { value: 'CreatedDate', bg: 'white-drop' }, { value: 'UpdatedDate', bg: 'white-drop' }]
  ];
  UserDataCollumns = this.UserCollumnHeaders;
  currentQuery: any = { "PageNo": 1, "PageSize": 10 };
  currentWal = sessionStorage.getItem('WalChosen');

  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[] = [];
  apiLoader = { podc_list: false };
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService) { }

  ngOnInit(): void {
    this.currentWal = this.uWalId;
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading: any = {}) => {
      this.apiLoader.podc_list = ('getOnlineDepositList' in loading) ? true : false;
    });
    this.GetUserStatement(this.currentWal);
  }

  initializeData() {
    this.AllUserinfo = [];
    this.UserinfoData = [];
  }

  GetUserStatement(userselWal: any) {
    this.initializeData();
    this.currentWal = userselWal;
    let param = "?PageNo=" + this.currentQuery.PageNo + "&UserId=" + this.userId + '&WalletTypeId=' + userselWal;
    // let param = "?PageNo=" + this.currentQuery.PageNo + "&UserId=" + this.userId;
    this.apiSubscriber[0] = this.apiservice.getRequest(config['getOnlineDepositList'] + param, 'getOnlineDepositList').subscribe((data: any) => {
      this.AllUserinfo = data.ErrorMessage ? JSON.parse(data.ErrorMessage) : '';
      if (this.AllUserinfo.length >= 1) {
        this.UserDataCollumns = this.UserCollumnHeaders;
        this.pagesTotal = Math.ceil(this.AllUserinfo[0].TotalCount / this.currentQuery.PageSize);
        this.AllUserinfo.forEach((element: any, index: any) => {
          let ctz = element.CreatedDateTZ ? " " + element.CreatedDateTZ : '';
          let utz = element.UpdatedDateTZ ? " " + element.UpdatedDateTZ : '';
          this.UserinfoData.push([
            { value: ((this.currentQuery.PageNo - 1) * this.currentQuery.PageSize) + (index + 1), bg: 'white-cell' },
            { value: element.RequestId, bg: 'white-cell' },
            { value: element.Amount, bg: 'white-cell' },
            { value: element.Name, bg: 'white-cell' },
            { value: element.GatewayName, bg: 'white-cell' },
            { value: element.TransactionId, bg: 'white-cell' },
            { value: element.ReferenceId, bg: 'white-cell' },
            { value: element.CreatedDate ? moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy") + ctz : '', bg: 'white-cell' },
            { value: element.UpdatedDate ? moment(element.UpdatedDate).format("h:mm:ss A, DD-MMM-yyyy") + utz : '', bg: 'white-cell' }
          ])
        });
        this.rowCount = { f: this.UserinfoData[0][0].value, l: this.UserinfoData[this.UserinfoData.length - 1][0].value, t: this.AllUserinfo[0].TotalCount };
        this.setPaginator();
      }
      else {
        this.rowCount = { f: 0, l: 0, t: 0 };
        this.UserDataCollumns = this.utilities.TableDataNone;
      }
    }, (error) => {
      console.log(error);
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
    this.GetUserStatement(this.currentWal);
  }

  setPaginator() {
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
    if (this.apiSubscriber[0]) {
      this.apiSubscriber[0].unsubscribe();
    }
  }
}