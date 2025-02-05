import { Component, OnInit, OnDestroy } from '@angular/core';
import moment from 'moment';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { CommonFunctionService } from '@services/common-function.service';
import { Subscription } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-user-bonus',
  imports: [
    ModulesModule
  ],
  templateUrl: './user-bonus.component.html',
  styleUrl: './user-bonus.component.scss',
  providers: [DatePipe]

})
export class UserBonusComponent implements OnInit {
  todayDate = new Date();
  maxDate = new Date();

  maxDF: any | null;
  currentQuery: any | null;
  dynamicControls: any = [];
  userWals = JSON.parse(sessionStorage.getItem('WalList') || '{}');
  // dynamicControls = [
  //   { changeAction: 'submit', que: 'wallet', type: 'dropdown', default: parseInt(sessionStorage.getItem('WalChosen') || '{}'), options: this.userWals.map(({ Id, Name, Code }: { Id: any; Name: any; Code: any; }) => ({ op: Name + ' - ' + Code, val: Id })), subque: [] },
  //   // {que:'Date',type:'date',defaultDate:this.maxDF,maxDate:this.maxDF,subque:[]},
  //   { que: 'Date', type: 'daterange', minDate: null, maxDate: this.maxDF, startDate: this.maxDF, endDate: this.maxDF, subque: [] },
  //   { que: 'Player', type: 'input', subque: [] },
  //   { que: 'Search', type: 'input', subque: [] }
  // ];
  rUsersCollumns: any = [];

  rUsersCollumnHeaders: any = [
    [
      { value: 'Sr. No.', bg: 'white-drop' },
      { value: 'User ID', bg: 'white-drop' },
      { value: 'Name', bg: 'white-drop' },
      { value: 'User Name', bg: 'white-drop' },
      { value: 'Mobile', bg: 'white-drop' },
      { value: 'Bonus Amount', bg: 'white-drop' },
      { value: 'Description', bg: 'white-drop' },
      { value: 'CreatedDate', bg: 'white-drop' }
    ]
  ];
  rUsersData: { TotalCount: any; }[] = [];
  rUsersRows: { value: any; bg: any }[][] = [];

  pageNo = 1;
  rowCount: any = { f: 0, l: 0, t: 0 };
  pageCount = [10, 50, 100, 500, 1000];
  pagesTotal = 1;
  paginatorBlock: any = [];

  // currentQuery={"FromDate": this.maxDF,"ToDate": this.maxDF,"SiteCode":sessionStorage.getItem('selectedSite'),"WalletTypeId":sessionStorage.getItem('WalChosen'),"Pagination":1,"PageSize":this.pageCount[0],"Search":"","PlayerId":""}
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[] = [];
  apiLoader = { rlc_list: false, rlc_export: false };
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService, private datePipe: DatePipe) {
    this.maxDF = this.datePipe.transform(this.maxDate, 'yyyy-MM-dd');
    this.currentQuery = { "FromDate": this.maxDF, "ToDate": this.maxDF, "SiteCode": sessionStorage.getItem('selectedSite'), "WalletTypeId": sessionStorage.getItem('WalChosen'), "Pagination": 1, "PageSize": this.pageCount[0], "Search": "", "PlayerId": "" }
    this.dynamicControls = [
      { changeAction: 'submit', que: 'wallet', type: 'dropdown', default: parseInt(sessionStorage.getItem('WalChosen') || '{}'), options: this.userWals.map(({ Id, Name, Code }: { Id: any; Name: any; Code: any; }) => ({ op: Name + ' - ' + Code, val: Id })), subque: [] },
      // {que:'Date',type:'date',defaultDate:this.maxDF,maxDate:this.maxDF,subque:[]},
      { que: 'Date', type: 'daterange', minDate: null, maxDate: this.maxDF, startDate: this.maxDF, endDate: this.maxDF, subque: [] },
      { que: 'Player', type: 'input', subque: [] },
      { que: 'Search', type: 'input', subque: [] }
    ];
  }

  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading: any = {}) => {
      this.apiLoader.rlc_list = ('userdepositbous' in loading) ? true : false;
      this.apiLoader.rlc_export = ('reportBonuslist' in loading) ? true : false;
    });
    this.GetUsersBonus();
  }

  setPaginator() {
    this.paginatorBlock = [];
    if (this.currentQuery.Pagination <= 4) {
      for (let i = 1; i <= 10 && i <= this.pagesTotal; i++) {
        this.paginatorBlock.push(i);
      }
    }
    else {
      for (let i = this.currentQuery.Pagination - 3; i <= this.currentQuery.Pagination + 6 && i <= this.pagesTotal; i++) {
        this.paginatorBlock.push(i);
      }
    }
  }
  getSearchQuery(formVal: any) {
    this.currentQuery.Search = formVal.Search.value;
    this.currentQuery.PlayerId = formVal.Player.value ? formVal.Player.value : '';
    this.currentQuery.WalletTypeId = formVal.wallet.value;
    sessionStorage.setItem('WalChosen', formVal.wallet.value);
    this.currentQuery.FromDate = this.datePipe.transform(formVal.Date.value1, 'yyyy-MM-dd');
    this.currentQuery.ToDate = this.datePipe.transform(formVal.Date.value2, 'yyyy-MM-dd');
    this.currentQuery.Pagination = 1
    this.GetUsersBonus();
  }


  onPaginatorChange(paginatorQuery: any) {
    if (paginatorQuery.action == 'next') {
      this.currentQuery.Pagination = this.currentQuery.Pagination + 1;
    }
    else if (paginatorQuery.action == 'previous') {
      this.currentQuery.Pagination = this.currentQuery.Pagination - 1;
    }
    else if (paginatorQuery.action == 'pageSize') {
      this.currentQuery.Pagination = 1;
      this.currentQuery.PageSize = paginatorQuery.pageSize;
    }
    else if (paginatorQuery.action == 'pageNo') {
      this.currentQuery.Pagination = paginatorQuery.pageNo;
    }
    this.GetUsersBonus();
  }

  GetUsersBonus() {
    this.rUsersRows = [];
    this.rUsersCollumns = [];
    this.rUsersData = [];
    this.apiSubscriber[0] = this.apiservice.sendRequest(config['userdepositbous'], this.currentQuery, 'userdepositbous').subscribe((data: any) => {
      this.rUsersData = data;
      if (this.rUsersData[0]) {
        this.pagesTotal = Math.ceil(this.rUsersData[0].TotalCount / this.currentQuery.PageSize);
        this.rUsersCollumns = this.rUsersCollumnHeaders;
        this.rUsersData.forEach((element: any, index: any) => {
          let ctz = element.CreatedDateTZ ? " " + element.CreatedDateTZ : '';
          this.rUsersRows.push([
            { value: ((this.currentQuery.Pagination - 1) * this.currentQuery.PageSize) + (index + 1), bg: 'white-cell' },
            { value: element.UserId, bg: 'white-cell' },
            { value: element.FName, bg: 'white-cell' },
            { value: element.UserName, bg: 'white-cell' },
            { value: element.Mobile, bg: 'white-cell' },
            { value: element.BonusAmount, bg: 'white-cell' },
            { value: element.Description, bg: 'white-cell' },
            { value: element.CreatedDate ? moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy") + ctz : '', bg: 'white-cell' },
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

  }

  downLoad() {
    let d1 = (moment(this.currentQuery.FromDate).format("DD/MM/yyyy HH:mm"));
    let d2 = (moment(this.currentQuery.ToDate).format("DD/MM/yyyy HH:mm"));
    let searchterm = this.currentQuery.Search ? this.currentQuery.Search : '';
    let player = this.currentQuery.PlayerId ? this.currentQuery.PlayerId : '';
    let request = "?Search=" + searchterm + "&FromDate=" + d1 + "&ToDate=" + d2 + '&SiteCode=' + sessionStorage.getItem('selectedSite') + '&WalletTypeId=' + this.currentQuery.WalletTypeId + "&PlayerId=" + player;
    let docname = 'User_Bonus_' + moment(this.currentQuery.FromDate).format("DD/MM/yyyy") + '_' + moment(this.currentQuery.ToDate).format("DD/MM/yyyy");
    this.apiservice.exportExcel(config['reportBonuslist'] + request, docname, 'reportBonuslist');
  }

  ngOnDestroy() {
    if (this.loaderSubscriber) {
      this.loaderSubscriber.unsubscribe();
    }
    if (this.apiSubscriber[0]) {
      this.apiSubscriber[0].unsubscribe();
    }
  }
}
