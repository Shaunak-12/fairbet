import { Component, OnInit, OnDestroy } from '@angular/core';
import moment from 'moment';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { CommonFunctionService } from '@services/common-function.service';
import { Subscription } from 'rxjs';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-user-deposit-list',
  imports: [
    ModulesModule,
    
  ],
  templateUrl: './user-deposit-list.component.html',
  styleUrl: './user-deposit-list.component.scss'
})
export class UserDepositListComponent implements OnInit, OnDestroy {
  todayDate = new Date();
  dateValue: any = [new Date(), new Date()];

  buttonData = [{ name: 'Export', disabled: true, value: 'export' }];
  searchOptions = [{ name: 'All Selected', value: 0 }, { name: 'Success', value: 1 }, { name: 'Created', value: 2 }];

  rUsersCollumns: any = [];

  rUsersCollumnHeaders: any = [
    [
      { value: 'Sr. No.', bg: 'white-drop' },
      { value: 'UserId', bg: 'white-drop' },
      { value: 'RequestId', bg: 'white-drop' },
      { value: 'Amount', bg: 'white-drop' },
      { value: 'Name', bg: 'white-drop' },
      { value: 'Mobile', bg: 'white-drop' },
      { value: 'UTR', bg: 'white-drop' },
      { value: 'Status', bg: 'white-drop' },
      { value: 'Description', bg: 'white-drop' },
      { value: 'Mode', bg: 'white-drop' },
      { value: 'Created by', bg: 'white-drop' },
      { value: 'Created Date', bg: 'white-drop' },
      { value: 'Bank Date', bg: 'white-drop' },
      { value: 'Added Date', bg: 'white-drop' },
      { value: 'Bank Receipt', bg: 'white-drop' },
      { value: 'View', bg: 'white-drop' }
    ]
  ];

  rUsersData: { TotalCount: any; UserId: any; TransactionId: any; }[] = [];
  rUsersRows: { value: any; bg: any; icon?: any; iconvalue?: any; sufText?: any; }[][] = [];

  pageNo = 1;
  rowCount: any = { f: 0, l: 0, t: 0 };
  pageCount = [10, 50, 100, 500, 1000];
  pagesTotal = 1;
  paginatorBlock: any = [];

  currentQuery = { "Dates": [this.dateValue[0], this.dateValue[1]], "Search": "", "intParam1": 0, "PageNo": 1, "PageSize": this.pageCount[0], "SiteCode": sessionStorage.getItem('selectedSite'), "WalletTypeId": sessionStorage.getItem('WalChosen'), "PlayerId": "" };

  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[] = [];
  apiLoader = { udl_list: false, udl_export: false };
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService) { }

  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading: any = {}) => {
      this.apiLoader.udl_list = ('getUserDepositList' in loading) ? true : false;
      this.apiLoader.udl_export = ('downloadUserDepositList' in loading) ? true : false;
    });
    this.GetRegisteredUsers(this.currentQuery);
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

  searchRegistered(searchQuery: any) {
    this.currentQuery.Dates = searchQuery.Dates;
    this.currentQuery.intParam1 = searchQuery.Option;
    this.currentQuery.PageNo = 1;
    this.currentQuery.Search = searchQuery.searchInput;
    this.currentQuery.PlayerId = searchQuery.playerInput;
    this.currentQuery.WalletTypeId = searchQuery.wallet;
    this.GetRegisteredUsers(this.currentQuery);
  }

  onPaginatorChange(paginatorQuery: any) {
    if (paginatorQuery.action == 'next') {
      this.currentQuery.PageNo = this.currentQuery.PageNo + 1;
    }
    else if (paginatorQuery.action == 'previous') {
      this.currentQuery.PageNo = this.currentQuery.PageNo - 1;
    }
    else if (paginatorQuery.action == 'pageSize') {
      this.currentQuery.PageNo = 1;
      this.currentQuery.PageSize = paginatorQuery.pageSize;
    }
    else if (paginatorQuery.action == 'pageNo') {
      this.currentQuery.PageNo = paginatorQuery.pageNo;
    }
    this.GetRegisteredUsers(this.currentQuery);
  }

  GetRegisteredUsers(searchQuery: any) {
    let request = {
      "StartDateTime": moment(searchQuery.Dates[0]).format("MM-DD-yyyy"),
      "EndDateTime": moment(searchQuery.Dates[1]).format("MM-DD-yyyy"),
      "intParam1": searchQuery.intParam1,
      "PageNo": searchQuery.PageNo,
      "PageSize": searchQuery.PageSize,
      "SiteCode": searchQuery.SiteCode,
      "Search": searchQuery.Search,
      "WalletTypeId": searchQuery.WalletTypeId,
      "PlayerId": searchQuery.PlayerId,
    };
    this.rUsersRows = [];
    this.rUsersCollumns = [];
    this.pagesTotal = 1;
    this.buttonData[0].disabled = true;
    this.rUsersData = [];
    this.apiSubscriber[0] = this.apiservice.sendRequest(config['getUserDepositList'], request, 'getUserDepositList').subscribe((data: any) => {
      this.currentQuery = searchQuery;
      this.rUsersData = data;
      if (this.rUsersData[0]) {
        this.buttonData[0].disabled = false;
        this.rUsersCollumns = this.rUsersCollumnHeaders;
        this.pagesTotal = Math.ceil(this.rUsersData[0].TotalCount / searchQuery.PageSize);
        this.rUsersData.forEach((element: any, index: any) => {
          let ctz = element.CreatedDateTZ ? " " + element.CreatedDateTZ : '';
          this.rUsersRows.push([
            { value: ((this.currentQuery.PageNo - 1) * this.currentQuery.PageSize) + (index + 1), bg: 'white-cell' },
            { value: element.UserId, bg: 'white-cell' },
            { value: element.TransactionId, bg: 'white-cell' },
            { value: 'Paid Amount:' + (element.ActualPaidAmount > 0 ? element.ActualPaidAmount : element.Amount), bg: 'white-cell', sufText: element.Amount },
            { value: element.Name, bg: 'white-cell', sufText: element.UserName },
            { value: element.Mobile, bg: 'white-cell' },
            { value: element.UTR, bg: 'white-cell', sufText: element.BankUPI ? 'Bank:' + element.BankUPI + ' ' + element.BankType : '' },
            { value: element.Status, bg: 'white-cell' },
            { value: element.Description, bg: 'white-cell' },
            { value: element.paymentMode, bg: 'white-cell break-class' },
            { value: element.CreatedBy, bg: 'white-cell' },
            { value: element.CreatedDate ? moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy") + ctz : '', bg: 'white-cell' },
            { value: element.BankDate ? moment(element.BankDate).format("h:mm:ss A, DD-MMM-yyyy") + ctz : '', bg: 'white-cell' },
            ...(element.UpdatedDate ? [{ value: moment(element.UpdatedDate).format("h:mm:ss A, DD-MMM-yyyy") + ctz, bg: 'white-cell', sufText: "Claim : " + element.ClaimTime }] : [{ value: "", bg: 'white-cell' }]),
            { value: element.TransactionId, bg: 'white-cell', icon: 'feather', iconvalue: 'file' },
            { value: '', bg: 'white-cell', icon: 'View' }
          ])
        });
        this.rowCount = { f: this.rUsersRows[0][0].value, l: this.rUsersRows[this.rUsersRows.length - 1][0].value, t: this.rUsersData[0].TotalCount };
        this.setPaginator();
      }
      else {
        this.rowCount = { f: 0, l: 0, t: 0 };
        this.rUsersCollumns = this.utilities.TableDataNone;
      }
    }, (error) => {
      console.log(error);
    });
  }

  onValueChange(formVal: any) {
    // console.log(formVal);
    if (formVal.type == 'View') {
      window.open('/users/playerdetailview/' + this.rUsersData[formVal.row].UserId, '_blank');
    }
    if (formVal.type == 'file') {
      let image = this.rUsersData[formVal.row].TransactionId ? 'https://rcptapi.fairbet91.com/' + this.rUsersData[formVal.row].TransactionId + '.png' : ''
      window.open(image, '_blank');
    }
  }

  DownloadRegisteredUsersData() {
    let d1 = (moment(this.currentQuery.Dates[0]).format("DD/MM/yyyy HH:mm"));
    let d2 = (moment(this.currentQuery.Dates[1]).format("DD/MM/yyyy HH:mm"));
    let request = "?intParam1=" + this.currentQuery.intParam1 + "&StartDateTime=" + d1 + "&EndDateTime=" + d2 + '&SiteCode=' + sessionStorage.getItem('selectedSite') + '&WalletTypeId=' + this.currentQuery.WalletTypeId + '&PlayerId=' + this.currentQuery.PlayerId;
    let docname = 'UserDeposit_Report_' + moment(this.currentQuery.Dates[0]).format("DD/MM/yyyy");
    this.apiservice.exportExcel(config['downloadUserDepositList'] + request, docname, 'downloadUserDepositList');
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