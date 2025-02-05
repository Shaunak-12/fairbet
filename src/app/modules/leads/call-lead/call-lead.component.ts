import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ModulesModule } from '@modules/modules/modules.module';
import { CompleteComponent } from './complete/complete.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CallingPopComponent } from './calling-pop/calling-pop.component';
import { SendConfirmComponent } from './send-confirm/send-confirm.component';


import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { Target } from 'angular-feather/icons';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-call-lead',
  imports: [
    ModulesModule,
    CompleteComponent,
    UpdateUserComponent,
    CallingPopComponent,
    SendConfirmComponent,
    
  ],
  templateUrl: './call-lead.component.html',
  styleUrl: './call-lead.component.scss'
})
export class CallLeadComponent implements OnInit {
  @ViewChild('completelead') completelead!: TemplateRef<any>
  @ViewChild('updateUser') updateUser!: TemplateRef<any>
  @ViewChild('callIng') callIng!: TemplateRef<any>
  @ViewChild('confirm') confirm!: TemplateRef<any>
  idLeads = '';
  AllCallRequestinfo: any = [];
  CallRequestinfoData: any = [];
  rowCount:any = { f: 0, l: 0, t: 0 };
  pageCount = [10, 50, 100, 500, 1000];
  showListing = true;
  dIndex={assign:{row:0,col:0,use:false}};
  assignDisabled = false;
  showFormCreate = '';
  assignList: any = [];
  pagesTotal = 1;
  udataToView: { tempMobile?: string; CountryCode?: string; [key: string]: any } = {};
  AcceptRejectVar = "A";
  paginatorBlock: any = [];
  showassignButton = false;
  assignadminid = '0';
  userData = JSON.parse(localStorage.getItem('personalDetails')||'');
  userWals = (JSON.parse(sessionStorage.getItem('WalList')||''));
  finList = this.userWals.push({ "Id": "0", "Name": "All", "Code": "Wallets", "CurrencyType": "Wallets", "CurrencySymbol": "&#8377;", "IsRealMoney": 1, "Wallets": null });
  dynamicControls = [
    { changeAction: 'submit', que: 'wallet', type: 'dropdown', default:this.userWals[0][0], options: this.userWals.map(({ Id, Name, Code }:{ Id: any; Name: any; Code: any; }) => ({ op: Name + ' - ' + Code, val: Id })), subque: [] },
    { que: 'PlayerId', type: 'input', subque: [] },
    { que: 'Search', type: 'input', subque: [] }
  ];
  UserCollumnHeaders: any = [[{ value: false, bg: 'white-drop', icon: 'Checkbox' }, { value: 'Sr. No.', bg: 'white-drop' }, { value: 'Id', bg: 'white-drop' }, { value: 'User Name', bg: 'white-drop' }, { value: 'Name', bg: 'white-drop' },
  { value: 'Mobile', bg: 'white-drop' }, { value: 'Account Balance', bg: 'white-drop' }, { value: 'Currency Type', bg: 'white-drop' }, { value: 'Description', bg: 'white-drop' }, { value: 'Assign Admin', bg: 'white-drop' }, { value: 'Action', bg: 'white-drop' }]
  ];
  UserDataCollumns: any = [];
  currentQuery = { "Search": "", "PageNo": 1, "PageSize": this.pageCount[2], "SiteCode": sessionStorage.getItem('selectedSite'), "WalletTypeId": 0, "PlayerId": "" };
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[] = [];
  apiLoader = { crc_list: false };
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading: any = {}) => {
      this.apiLoader.crc_list = ('assignPlayer' in loading) ? true : false;
      if(this.dIndex.assign.use)
        {
          this.CallRequestinfoData[this.dIndex.assign.row][this.dIndex.assign.col].icon=('callLead' in loading)?'Loading':'Multi';
        }
      // this.apiLoader.crc_list = this.PageRows[this.dIndex.status.row][this.dIndex.status.col].icon='Loading';
    });
    this.GetAllAdmin();
    this.GetAllCallRequests();
  }

  initializeData() {
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
    this.apiSubscriber[0] = this.apiservice.sendRequest(config['assignPlayer'], this.currentQuery, 'assignPlayer').subscribe((data: any) => {
      this.AllCallRequestinfo = data;
      if (this.AllCallRequestinfo[0]) {
        this.UserDataCollumns = this.UserCollumnHeaders;
        this.pagesTotal = Math.ceil(this.AllCallRequestinfo[0].TotalCount / this.currentQuery.PageSize);
        let bg_cell = ''
        this.AllCallRequestinfo.forEach((element: any, index: any) => {
          bg_cell = element.FirstDeposit && (element.StatusCode == 'PR' || element.StatusCode == 'P') ? 'blue-blink-cell' : 'white-cell';
          this.CallRequestinfoData.push([
            { value: false, bg: 'white-cell', icon: 'Checkbox' },
            { value: ((this.currentQuery.PageNo - 1) * this.currentQuery.PageSize) + (index + 1), bg: bg_cell },
            { value: element.UserId, bg: bg_cell },
            { value: element.UserName, bg: bg_cell },
            { value: element.FName + ' ' + element.LName, bg: bg_cell },
            { value: element.Mobile, bg: bg_cell },
            { value: element.AccountBalance, bg: bg_cell },
            { value: element.CurrencyType, bg: bg_cell },
            { value: element.Remark, bg: bg_cell },
            { value: element.AssignAdmin, bg: bg_cell },
            {
              bg: bg_cell, icon: 'Multi', value: [
                ...(element.Remark ? [{ value: '', bg: bg_cell }] : [{ value: 'Complete', bg: bg_cell, icon: 'None' }]),
                ...(this.userData.RoleCode == 'SA' ? [{ value: 'Assign', bg: bg_cell, icon: 'None' }] : []),
                ...([{ value: 'Call', bg: bg_cell, icon: 'None' }]),
                ...(element.IsShowSmsbtn==1?[{ value: 'SMS Send', bg: bg_cell, icon: 'None' }]:[]),
              ]
            },

          ])
        });
        this.rowCount = { f: this.CallRequestinfoData[0][1].value, l: this.CallRequestinfoData[this.CallRequestinfoData.length - 1][1].value, t: this.AllCallRequestinfo[0].TotalCount };
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
  GetAllAdmin() {
    this.apiservice.getRequest(config['getAllAdminList'], 'getAllAdminList').subscribe({
      next: (data) => {
        this.assignList = data;
      },
      error(err) {
        console.error('Error:', err);
      },
    });
  }

  showLeadForm() {
    this.showListing = false;
    this.showFormCreate = 'AddLead';
  }
  AssignToAdmin() {
    let idval = this.idLeads;
    if (this.assignadminid == '0') {
      this.utilities.toastMsg("warning", "Failed", "Please select admin from dropdown to assign");
      return false;
    }
    if (idval == '') {
      this.utilities.toastMsg("warning", "Failed", "Please select atleast once record");
      return false;
    }
    let request = {
      "Ids": idval,
      "SupportAdminId": this.assignadminid
    };
    this.assignDisabled = true;
    this.apiservice.sendRequest(config['assignAdminId'], request).subscribe((response: any) => {
      this.assignDisabled = false;
      console.log(response)
      if (response != null) {
        if (response.ErrorCode === "1") {
          this.showassignButton = false;
          this.idLeads = '';
          this.assignadminid = '0';
          this.utilities.toastMsg('success', "Success", response.ErrorMessage);
          this.GetAllCallRequests();
        }
        else {
          this.utilities.toastMsg("error", "Failed", response.Result + " : " + response.ErrorMessage);
        }
      }
    }, (error) => {
      console.log(error);
    });
    return true;
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
  onHeaderValueChange(formVal: any) {
    if (formVal.row == 0 && formVal.col == 0) {
      this.idLeads = '';
      if (formVal.type == true) {
        for (let i = 0; i < this.CallRequestinfoData.length; i++) {
          this.CallRequestinfoData[i][0].value = true;
          this.idLeads += (this.idLeads.length > 0 ? ',' : '') + this.AllCallRequestinfo[i].UserId;
        }
      }
      else {
        for (let i = 0; i < this.CallRequestinfoData.length; i++) {
          this.CallRequestinfoData[i][0].value = false;
        }
      }
    }
  }
  onValueChange(formVal: any) {
    if (formVal.type == 'Complete') {
      this.udataToView = this.AllCallRequestinfo[formVal.row];
      this.CompleteOpenPopup();
    }
    if (formVal.type == 'Assign') {
      this.udataToView = this.AllCallRequestinfo[formVal.row];
      this.AssignUser();
    }
    if (formVal.type == 'Call') {
      this.dIndex.assign.use = true;
      this.dIndex.assign.row = formVal.row;
      this.dIndex.assign.col = formVal.col;
      this.udataToView = this.AllCallRequestinfo[formVal.row];
      this.CallOption();
    }
    if (formVal.type == 'SMS Send') {
      this.dIndex.assign.use = true;
      this.dIndex.assign.row = formVal.row;
      this.dIndex.assign.col = formVal.col;
      this.udataToView = this.AllCallRequestinfo[formVal.row];
      this.SendSms();
    }
    if (formVal.col == 0) {
      this.UserDataCollumns[0][0].value = false;
      if (formVal.type == true) {
        this.idLeads += (this.idLeads.length > 0 ? ',' : '') + this.AllCallRequestinfo[formVal.row].UserId;
      }
      else {
        let idregex = new RegExp('\\b' + this.AllCallRequestinfo[formVal.row].UserId + '\\b');
        let idIndex = this.idLeads.search(idregex);
        let idLength = (this.AllCallRequestinfo[formVal.row].UserId).toString().length;
        if (idIndex == 0 && this.idLeads.length != idLength) {
          idLength++;
        }
        else if (idIndex != 0) {
          idIndex--;
          idLength++;
        }
        let newIds = this.idLeads.slice(0, idIndex) + this.idLeads.slice(idIndex + idLength);
        this.idLeads = newIds;
      }
    }
  }
  AssignUser() {
    let dialogRef = this.dialog.open(this.updateUser, {
      height: '900x',
      width: '600px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => { })
  }
  CallOption() {
    let data = {Diresu:this.userData.UserId,Edocetis:sessionStorage.getItem('selectedSite'),Phone:this.udataToView['tempMobile'],cntryCode:this.udataToView['CountryCode']}
    const encodedData = btoa(JSON.stringify(data));
    window.open(environment.callUrl+'call.htm?data='+encodedData,'_blank');
  }
  SendSms() {
    let dialogRef = this.dialog.open(this.confirm, {
      height: '900x',
      width: '600px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  CompleteOpenPopup() {
    let dialogRef = this.dialog.open(this.completelead, {
      height: '900x',
      width: '600px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => { })
  }

  getSearchQuery(formVal: any) {
    this.currentQuery.Search = formVal.Search.value;
    this.currentQuery.PlayerId = formVal.PlayerId.value;
    this.currentQuery.WalletTypeId = formVal.wallet.value;
    this.currentQuery.PageNo = 1;
    this.GetAllCallRequests();
  }
  save() {
    this.GetAllCallRequests();
    this.dialog.closeAll();
  }
  onback() {
    this.dialog.closeAll();
  }
  onback2() {
    this.dialog.closeAll();
    this.GetAllCallRequests();
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
