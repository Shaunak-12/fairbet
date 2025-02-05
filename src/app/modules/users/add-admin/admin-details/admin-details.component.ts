import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-admin-details',
  imports: [
    ModulesModule
  ],
  templateUrl: './admin-details.component.html',
  styleUrl: './admin-details.component.scss'
})
export class AdminDetailsComponent implements OnInit {
  // @ViewChild('DepositWithdrawPopUp') DepositWithdrawPopUp!: TemplateRef<any>;
  // @ViewChild('BlockUserPopUp') BlockUserPopUp!: TemplateRef<any>;
  // @ViewChild('editRollAmount') editRollAmount!:TemplateRef<any> ;
  BasicDetail: any = [];
  isReal = 0;
  pagesTotal = 1;
  paginatorBlock: any = [];
  // dynamicControls = [{placeholder:'Search',type:'text',label:'Search'}];
  userId = 0;
  UserCollumnLoading = false;

  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[] = [];
  walObj: any = {};
  rowData: any;
  userData: any = []
  rowCount = { f: 0, l: 0, t: 0 };
  pageCount = [5, 10, 50, 100, 500, 1000];
  personDetails = JSON.parse(localStorage.getItem('personalDetails') || '{}');
  addadminloader = { loader: false }
  maxDate = new Date();
  dynamicControls = [
    { changeAction: 'submit', que: 'Type', type: 'dropdown', default: '', options: [{ val: "Daily", op: 'Daily' }, { val: "Monthly", op: 'Monthly' }], subque: [] },
    { que: 'date', type: 'date', defaultDate: this.maxDate, maxDate: this.maxDate, startDate: this.maxDate, subque: [] },
    { que: 'Search', type: 'input', subque: [] }
  ];
  AdminCollumnHeaders: any = [
    [{ value: 'Sr. No.', bg: 'white-drop' },
    { value: 'Name', bg: 'white-drop' },
    { value: 'Mobile', bg: 'white-drop' },
    { value: 'Depost/Withdraw', bg: 'white-drop' },
    { value: 'Profit', bg: 'white-drop' },
    { value: 'Action', bg: 'white-drop' },
    ]
  ];
  AdminDataCollumns: { value: string; bg: string; }[][] = [];
  AllAdmininfo: any = [];
  AdmininfoData: any = [];
  currentQuery = { "PageNo": 1, "Search": "", "AdminId": 0, "PageSize": this.pageCount[2], "WalletTypeId": parseInt(sessionStorage.getItem('WalChosen') || '{}'), "Date": moment(this.maxDate).format('YYYY-MM-DD HH:mm:ss'), "Type": "Daily" }
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading: any = {}) => {
      this.addadminloader.loader = ('getAdminDetails' in loading) ? true : false;
    });
    // let paramId = this.route.snapshot.paramMap.get('id');
    // if (paramId) {
    //   this.currentQuery.AdminId = parseInt(paramId);
    //   this.GetUserDetails();
    // }
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        const objectData = JSON.parse(decodeURIComponent((atob(params['data']))));
        if (objectData) {
          this.currentQuery.AdminId = parseInt(objectData.Id);
          this.GetUserDetails();
          this.BasicDetail = objectData;
        }
      }
    });

  }

  getSearchQuery(formVal: any) {
    this.currentQuery.Type = formVal.Type.value;
    this.currentQuery.Search = formVal.Search.value ? formVal.Search.value : "";
    this.currentQuery.Date = moment(formVal.date.value).format('YYYY-MM-DD HH:mm:ss');

    this.GetUserDetails();
  }


  copytoclipboard(hashid: any) {
    navigator.clipboard.writeText(hashid);
    this.utilities.toastMsg('success', 'Copied : ', hashid);
  }

  initializeData() {
    this.AdminDataCollumns = [];
    this.AllAdmininfo = [];
    this.AdmininfoData = [];
  }
  onPaginatorChange(paginatorQuery: any) {
    if (paginatorQuery.action == 'pageSize') {
      this.currentQuery.PageNo = 1;
      this.currentQuery.PageSize = paginatorQuery.pageSize;
    }
    else if (paginatorQuery.action == 'pageNo') {
      this.currentQuery.PageNo = paginatorQuery.pageNo;
    }
    this.GetUserDetails();
  }
  GetUserDetails() {
    this.initializeData();
    this.apiservice.sendRequest(config['getAdminDetails'], this.currentQuery, 'getAdminDetails').subscribe((data: any) => {
      this.AllAdmininfo = data;
      if (this.AllAdmininfo[0]) {
        this.AdminDataCollumns = this.AdminCollumnHeaders;
        this.pagesTotal = Math.ceil(this.AllAdmininfo[0].TotalCount / this.currentQuery.PageSize);
        this.AllAdmininfo.forEach((element: any, index: any) => {
          this.AdmininfoData.push([
            { value: ((this.currentQuery.PageNo - 1) * this.currentQuery.PageSize) + (index + 1), bg: 'white-cell' },
            { value: element.FName ? (element.FName + ' ' + (element.LName ? element.LName : '')) : '', bg: 'white-cell' },
            { value: element.Mobile, bg: 'white-cell' },
            {
              bg: 'white-cell', icon: "Multi", value: [
                { value: "Total Deposit: " + element.TotalDeposit, bg: 'white-cell' },
                { brLine: true },
                { value: "Total Withdraw : " + element.TotalWithdrawal, bg: 'white-cell' },

              ]
            },
            { value: element.TotalProfit, bg: 'white-cell' },
            { value: 'Call', bg: 'white-cell', icon: 'None' },

          ])
        });
        this.rowCount = { f: this.AdmininfoData[0][0].value, l: this.AdmininfoData[this.AdmininfoData.length - 1][0].value, t: this.AllAdmininfo[0].TotalCount };
        this.setPaginator();
      }
      else {
        this.rowCount = { f: 0, l: 0, t: 0 };
        this.AdminDataCollumns = this.utilities.TableDataNone;
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
  CallOption() {
    // window.open('https://bdupiuat.paytoononline.com/Callingv1/call.htm?Diresu='+this.userData.UserId+'&Edocetis='+sessionStorage.getItem('selectedSite')+'&Phone='+this.udataToView['Mobile']+'&cntryCode='+this.udataToView['CountryCode'],'_blank')
    // window.open('https://voipadmincallagentapi.fairbet91.com/call.htm?Diresu='+this.userData.UserId+'&Edocetis='+sessionStorage.getItem('selectedSite')+'&Phone='+this.userData.Mobile+'&cntryCode='+this.userData.CountryCode,'_blank')
    let data = { Diresu: this.userData.UserId, Edocetis: sessionStorage.getItem('selectedSite'), Phone: this.userData.tempMobile, cntryCode: this.userData.CountryCode };
    const encodedData = btoa(JSON.stringify(data));
    window.open(environment.callUrl + 'call.htm?data=' + encodedData, '_blank')
  }
  onValueChange(formVal: any) {
    if (formVal.type == 'Call') {
      // this.dIndex.assign.use = true;
      // this.dIndex.assign.row = formVal.row;
      // this.dIndex.assign.col = formVal.col;
      this.userData = this.AllAdmininfo[formVal.row];
      this.CallOption();
    }
  }
}
