import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { ModulesModule } from '@modules/modules/modules.module';
import { ChangeStatusComponent } from '../player-issue/change-status/change-status.component';

@Component({
  selector: 'app-player-details-issue',
  imports: [
    ModulesModule,
    ChangeStatusComponent
  ],
  templateUrl: './player-details-issue.component.html',
  styleUrl: './player-details-issue.component.scss'
})
export class PlayerDetailsIssueComponent implements OnInit {
  @ViewChild('changeCallbackIssue') changeCallbackIssue!: TemplateRef<any>;
  @Input() userId: any;
  AllCallRequestinfo: any = [];
  CallRequestinfoData: any = [];
  rowCount: any = { f: 0, l: 0, t: 0 };
  pageCount = [10, 50, 100, 500, 1000];
  pagesTotal = 1;
  udataToView = {};
  AcceptRejectVar = "A";
  paginatorBlock: any = [];
  category: any = []
  userWals = (JSON.parse(sessionStorage.getItem('WalList')||'{}'));
  finList = this.userWals.push({ "Id": "0", "Name": "All", "Code": "Wallets", "CurrencyType": "Wallets", "CurrencySymbol": "&#8377;", "IsRealMoney": 1, "Wallets": null });
  dynamicControls = [
    { changeAction: 'submit', que: 'wallet', type: 'dropdown', default: "0", options: this.userWals.map(({ Id, Name, Code }:{ Id:any; Name:any; Code:any; }) => ({ op: Name + ' - ' + Code, val: Id })), subque: [] },
    { changeAction: 'submit', que: 'CategoryId', type: 'dropdown', default: 0, options: [{ op: 'All', val: '' }], subque: [] },
    { changeAction: 'submit', que: 'RequestStatus', type: 'dropdown', default: 0, options: [{ op: 'All', val: '' }, { op: 'Open', val: 0 }, { op: 'Close', val: 1 }], subque: [] },
    // { que: 'PlayerId', type: 'input', subque: [] },
    { que: 'Search', type: 'input', subque: [] }
  ];
  UserCollumnHeaders: any = [
    [{ value: 'Sr. No.', bg: 'white-drop' },
    // { value: 'Id', bg: 'white-drop' },
    // { value: 'User Name', bg: 'white-drop' },
    // { value: 'Mobile', bg: 'white-drop' },
    { value: 'Request Type', bg: 'white-drop' },
    { value: 'Category Name', bg: 'white-drop' },
    { value: 'SubCategory Name', bg: 'white-drop' },
    { value: 'Request Status', bg: 'white-drop' },
    { value: 'Description', bg: 'white-drop' },
    { value: 'Close Remarks', bg: 'white-drop' },
    { value: 'Created Date ', bg: 'white-drop' },
    { value: 'Updated Date ', bg: 'white-drop' },
    { value: 'Action', bg: 'white-drop' }
    ]
  ];
  UserDataCollumns = this.UserCollumnHeaders;
  currentQuery = { "Search": "", "PageNo": 1, "PageSize": this.pageCount[0], "CategoryId": "", "SiteCode": sessionStorage.getItem('selectedSite'), "WalletTypeId": 0, "PlayerId": "", "RequestStatus": "" };
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[] = [];
  apiLoader = { crc_list: false };
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading: any = {}) => {
      this.apiLoader.crc_list = ('callbackConversation' in loading) ? true : false;
    });
    this.GetAllCallRequests();
    this.getAllCategory();
  }

  initializeData() {
    if (this.userId) {
      this.currentQuery.PlayerId = this.userId;
    }
    this.AllCallRequestinfo = [];
    this.CallRequestinfoData = [];
    this.udataToView = {};
    if (this.apiSubscriber[0]) {
      this.apiSubscriber[0].unsubscribe();
    }
  }

  onPaginatorChange(paginatorQuery: any) {
    if (paginatorQuery.action == 'pageSize') {
      this.currentQuery.PageNo = 1;
      this.currentQuery.PageSize = paginatorQuery.pageSize;
    }
    else if (paginatorQuery.action == 'pageNo') {
      this.currentQuery.PageNo = paginatorQuery.pageNo;
    }
    this.GetAllCallRequests();
  }

  GetAllCallRequests() {
    this.initializeData();
    this.apiSubscriber[0] = this.apiservice.sendRequest(config['callbackConversation'], this.currentQuery, 'callbackConversation').subscribe((data: any) => {
      this.AllCallRequestinfo = data;
      if (this.AllCallRequestinfo[0]) {
        this.UserDataCollumns = this.UserCollumnHeaders;
        this.pagesTotal = Math.ceil(this.AllCallRequestinfo[0].TotalCount / this.currentQuery.PageSize);
        let bg_cell = ''
        this.AllCallRequestinfo.forEach((element: any, index: any) => {
          bg_cell = element.FirstDeposit && (element.StatusCode == 'PR' || element.StatusCode == 'P') ? 'blue-blink-cell' : 'white-cell';
          this.CallRequestinfoData.push([
            { value: ((this.currentQuery.PageNo - 1) * this.currentQuery.PageSize) + (index + 1), bg: bg_cell },
            // { value: element.PlayerId, bg: bg_cell },
            // { value: element.UserName, bg: bg_cell },
            // { value: element.Mobile, bg: bg_cell },
            { value: element.RequestType, bg: bg_cell },
            { value: element.CategoryName, bg: bg_cell },
            { value: element.SubCategoryName, bg: bg_cell },
            { value: element.RequestStatusType, bg: bg_cell },
            { value: element.ChatDescription, bg: bg_cell },
            { value: element.Remarks, bg: bg_cell },
            { value: element.Createddate?moment(element.Createddate).format('h:mm:ss A, DD-MMM-yyyy'):'', bg: bg_cell ,sufText:'Ago: '+element.TimeAgo},
            { value: element.UpdatedDate?moment(element.UpdatedDate).format('h:mm:ss A, DD-MMM-yyyy'):'' , bg: bg_cell },
            ...element.Remarks?[]:[{ value: "Close Status", bg: bg_cell, icon: "None" }]
          ])
        });
        this.rowCount = { f: this.CallRequestinfoData[0][0].value, l: this.CallRequestinfoData[this.CallRequestinfoData.length - 1][0].value, t: this.AllCallRequestinfo[0].TotalCount };
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

  onValueChange(formVal: any) {
    if (formVal.type == 'Close Status') {
      this.udataToView = this.AllCallRequestinfo[formVal.row];
      this.CompleteOpenPopup();
    }
  }

  onSavePopup() {
    this.GetAllCallRequests();
    this.dialog.closeAll();
  }

  CompleteOpenPopup() {
    let dialogRef = this.dialog.open(this.changeCallbackIssue, {
      height: '900x',
      width: '600px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => { })
  }

  getSearchQuery(formVal: any) {
    this.currentQuery.RequestStatus = (formVal.RequestStatus.value == 0 || formVal.RequestStatus.value == 1) ? formVal.RequestStatus.value : ""
    this.currentQuery.CategoryId = formVal.CategoryId.value ? formVal.CategoryId.value : ""
    this.currentQuery.Search = formVal.Search.value ? formVal.Search.value : "";
    // this.currentQuery.PlayerId = formVal.PlayerId.value ? formVal.PlayerId.value : "";
    this.currentQuery.WalletTypeId = formVal.wallet.value;
    this.currentQuery.PageNo = 1;
    this.GetAllCallRequests();
  }
  getAllCategory() {
    this.apiservice.getRequest(config['getCategoryList'], 'getCategoryList').subscribe({
      next: (data: any) => {
        data.forEach((element: any) => {
          this.dynamicControls[1].options.push({ op: element.CategoryName, val: element.CategoryId })
        });
      },
      error: (error) => {

      }
    });
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
