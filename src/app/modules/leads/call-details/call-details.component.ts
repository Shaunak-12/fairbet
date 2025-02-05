import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-call-details',
  imports: [
    ModulesModule,
  ],
  templateUrl: './call-details.component.html',
  styleUrl: './call-details.component.scss'
})
export class CallDetailsComponent implements OnInit,OnDestroy {
  idLeads = '';
  AllCallRequestinfo: any = [];
  CallRequestinfoData: any = [];
  rowCount: any = { f: 0, l: 0, t: 0 };
  pageCount = [10, 50, 100, 500, 1000];
  showListing = true;
  dIndex={assign:{row:0,col:0,use:false}};
  assignDisabled = false;
  showFormCreate = '';
  assignList: any = [];
  pagesTotal = 1;
  udataToView = {};
  AcceptRejectVar = "A";
  paginatorBlock: any = [];
  showassignButton = false;
  assignadminid = '0';
  userData = JSON.parse(localStorage.getItem('personalDetails')||'{}');
  userWals = (JSON.parse(sessionStorage.getItem('WalList')||'{}'));
  finList = this.userWals.push({ "Id": "0", "Name": "All", "Code": "Wallets", "CurrencyType": "Wallets", "CurrencySymbol": "&#8377;", "IsRealMoney": 1, "Wallets": null });
  dynamicControls = [
    // { changeAction: 'submit', que: 'wallet', type: 'dropdown', default: "0", options: this.userWals.map(({ Id, Name, Code }) => ({ op: Name + ' - ' + Code, val: Id })), subque: [] },
    { que: 'PlayerId', type: 'input', subque: [] },
    { que: 'AgentId', type: 'input', subque: [] },
    { que: 'Search', type: 'input', subque: [] }
  ];
  UserCollumnHeaders: any = [[ { value: 'Sr. No.', bg: 'white-drop' },{ value: 'User Id', bg: 'white-drop' }, 
    { value: 'Agent Id', bg: 'white-drop' }, { value: 'Mobile', bg: 'white-drop' }, { value: 'Duration', bg: 'white-drop' },
  { value: 'Call Status', bg: 'white-drop' }, { value: 'Recording', bg: 'white-drop' },  { value: 'Date', bg: 'white-drop' }]
  ];
  UserDataCollumns: any = [];
  currentQuery = {"PageNo": 1, "PageSize": this.pageCount[2], "PlayerId": "","AgentId":"","Search": "" };
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[] = [];
  apiLoader = { crc_list: false };
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading: any = {}) => {
      this.apiLoader.crc_list = ('callleadDetails' in loading) ? true : false;
      if(this.dIndex.assign.use)
        {
          this.CallRequestinfoData[this.dIndex.assign.row][this.dIndex.assign.col].icon=('callLead' in loading)?'Loading':'Multi';
        }
      // this.apiLoader.crc_list = this.PageRows[this.dIndex.status.row][this.dIndex.status.col].icon='Loading';
    });
    this.GetCallDetails();
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
    this.GetCallDetails();
  }

  GetCallDetails() {
    this.initializeData();
    this.apiSubscriber[0] = this.apiservice.sendRequest(config['callleadDetails'], this.currentQuery, 'callleadDetails').subscribe((data: any) => {
      this.AllCallRequestinfo = data;
      if (this.AllCallRequestinfo[0]) {
        this.UserDataCollumns = this.UserCollumnHeaders;
        this.pagesTotal = Math.ceil(this.AllCallRequestinfo[0].TotalCount / this.currentQuery.PageSize);
        let bg_cell = ''
        bg_cell = 'white-cell';
        this.AllCallRequestinfo.forEach((element: any, index: any) => {
          this.CallRequestinfoData.push([
            { value: ((this.currentQuery.PageNo - 1) * this.currentQuery.PageSize) + (index + 1), bg: bg_cell },
            { value: element.UserId, bg: bg_cell },
            {bg:bg_cell,icon:"Multi",value:[
              {value:element.AgentName,bg:bg_cell},
              {brLine:true},
              {value:element.AgentId,bg:bg_cell},

            ]},
            { value: element.PlayerMobile, bg: bg_cell },
            { value: element.Duration , bg: bg_cell },
            { value: element.CallStatus, bg: bg_cell },
            {  bg: bg_cell +' break-class',icon:'Multi', value:[
              ...(element.FileName?[({ value: '', bg: bg_cell,icon:'feather', iconvalue:'volume-2'})]:[]),
            //   ({ value:element.FileName,hrefvalue:'https://voipcallagentaudio.fairbet91.com/'+element.FileName ,icon:'Anchor'})
            ]},
            {value:element.CreatedDate?moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy"):'',bg:'white-cell'},
           
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
    if(formVal.type == 'volume-2'){
      window.open(this.AllCallRequestinfo[formVal.row].FileName,'_blank');
    }
  }

  getSearchQuery(formVal: any) {
    this.currentQuery.Search = formVal.Search.value;
    this.currentQuery.AgentId = formVal.AgentId.value;
    this.currentQuery.PlayerId = formVal.PlayerId.value;
    this.currentQuery.PageNo = 1;
    this.GetCallDetails();
  }
  save() {
    this.GetCallDetails();
    this.dialog.closeAll();
  }
  onback() {
    this.dialog.closeAll();
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
