import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import moment from 'moment';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { CommonFunctionService } from '@services/common-function.service';
import Chart from 'chart.js/auto';
import { DatePipe } from '@angular/common';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-my-dashboard',
  imports: [
    ModulesModule,

  ],
  templateUrl: './my-dashboard.component.html',
  styleUrl: './my-dashboard.component.scss',
  providers: [DatePipe]

})
export class MyDashboardComponent implements OnInit, OnDestroy {
  dkCols = localStorage.getItem('dkMode') == 'sd-dark' ? true : false;
  dashboardCount = [
    { "name": "New User", "value": '0', "feather": "user-plus", "color": this.dkCols ? "#86afd9" : "#1c84ee", "isDownload": "N" },
    { "name": "New Depositor", "value": '0', "feather": "pie-chart", "color": this.dkCols ? "#7db39f" : "#33c38e", "isDownload": "N" },
    { "name": "All Depositor", "value": '0', "feather": "bar-chart", "color": this.dkCols ? "#86afd9" : "#ffcc5a", "isDownload": "N" },
    { "name": "Total TRX", "value": '0', "feather": "send", "color": this.dkCols ? "#86afd9" : "#1c84ee", "isDownload": "N" },
    { "name": "Deposit", "btnDownload": true, "btnLoader": false, "value": '0.00', "feather": "lock", "color": this.dkCols ? "#7db39f" : "#33c38e", "isDownload": "Y" },
    { "name": "Deposit Average", "value": '0.00', "feather": "trending-up", "color": this.dkCols ? "#86afd9" : "#ffcc5a", "isDownload": "N" },
    { "name": "Withdraw", "btnDownload": true, "btnLoader": false, "value": '0.00', "feather": "credit-card", "color": this.dkCols ? "#be9090" : "#ef6767", "isDownload": "Y" },
    { "name": "Difference", "value": '0.00', "feather": "flag", "color": this.dkCols ? "#7db39f" : "#33c38e", "isDownload": "N" },
    { "name": "Bonus", "btnDownload": true, "btnLoader": false, "value": '0.00', "feather": "lock", "color": this.dkCols ? "#be9090" : "#ef6767", "isDownload": "Y" },
    { "name": "Reverse Withdraw", "value": '0.00', "feather": "user-check", "color": this.dkCols ? "#86afd9" : "#1c84ee", "isDownload": "N" },
    { "name": "Pending Withdraw", "value": '0.00', "feather": "pie-chart", "color": this.dkCols ? "#be9090" : "#ef6767", "isDownload": "N" },
    { "name": "Pending Call Request", "value": '0', "feather": "bar-chart-2", "color": this.dkCols ? "#86afd9" : "#ffcc5a", "isDownload": "N" }
  ];
  dashboardCount2 = [
    { "name": "New User", "value": '0', "feather": "user-plus", "color": this.dkCols ? "#86afd9" : "#1c84ee", "isDownload": "N" },
    { "name": "New Depositor", "value": '0', "feather": "pie-chart", "color": this.dkCols ? "#7db39f" : "#33c38e", "isDownload": "N" },
    { "name": "All Depositor", "value": '0', "feather": "bar-chart", "color": this.dkCols ? "#86afd9" : "#ffcc5a", "isDownload": "N" },
    { "name": "Total TRX", "value": '0', "feather": "send", "color": this.dkCols ? "#86afd9" : "#1c84ee", "isDownload": "N" },
    // { "name": "Deposit", "btnDownload": true, "btnLoader": false, "value": '0.00', "feather": "lock", "color": this.dkCols?"#7db39f":"#33c38e", "isDownload": "Y" },
    // { "name": "Deposit Average", "value": '0.00', "feather": "trending-up", "color": this.dkCols?"#86afd9":"#ffcc5a", "isDownload": "N" },
    // { "name": "Withdraw", "btnDownload": true, "btnLoader": false, "value": '0.00', "feather": "credit-card", "color": this.dkCols?"#be9090":"#ef6767", "isDownload": "Y" },
    // { "name": "Difference", "value": '0.00', "feather": "flag", "color": this.dkCols?"#7db39f":"#33c38e", "isDownload": "N" },
    { "name": "Bonus", "btnDownload": true, "btnLoader": false, "value": '0.00', "feather": "lock", "color": this.dkCols ? "#be9090" : "#ef6767", "isDownload": "Y" },
    { "name": "Reverse Withdraw", "value": '0.00', "feather": "user-check", "color": this.dkCols ? "#86afd9" : "#1c84ee", "isDownload": "N" },
    { "name": "Pending Withdraw", "value": '0.00', "feather": "pie-chart", "color": this.dkCols ? "#be9090" : "#ef6767", "isDownload": "N" },
    { "name": "Pending Call Request", "value": '0', "feather": "bar-chart-2", "color": this.dkCols ? "#86afd9" : "#ffcc5a", "isDownload": "N" }
  ];
  dashboardCount1 = [
    { "name": "New User", "value": '0', "feather": "user-plus", "color": this.dkCols ? "#86afd9" : "#1c84ee", "isDownload": "N" },
    { "name": "New Depositor", "value": '0', "feather": "pie-chart", "color": this.dkCols ? "#7db39f" : "#33c38e", "isDownload": "N" },
    { "name": "All Depositor", "value": '0', "feather": "bar-chart", "color": this.dkCols ? "#86afd9" : "#ffcc5a", "isDownload": "N" },
    { "name": "Total TRX", "value": '0', "feather": "send", "color": this.dkCols ? "#86afd9" : "#1c84ee", "isDownload": "N" },
    // { "name": "Deposit", "btnDownload": true, "btnLoader": false, "value": '0.00', "feather": "lock", "color": this.dkCols?"#7db39f":"#33c38e", "isDownload": "Y" },
    // { "name": "Deposit Average", "value": '0.00', "feather": "trending-up", "color": this.dkCols?"#86afd9":"#ffcc5a", "isDownload": "N" },
    // { "name": "Withdraw", "btnDownload": true, "btnLoader": false, "value": '0.00', "feather": "credit-card", "color": this.dkCols?"#be9090":"#ef6767", "isDownload": "Y" },
    // { "name": "Difference", "value": '0.00', "feather": "flag", "color": this.dkCols?"#7db39f":"#33c38e", "isDownload": "N" },
    // { "name": "Bonus", "btnDownload": true, "btnLoader": false, "value": '0.00', "feather": "lock", "color": this.dkCols?"#be9090":"#ef6767", "isDownload": "Y" },
    // { "name": "Reverse Withdraw", "value": '0.00', "feather": "user-check", "color":this.dkCols?"#86afd9":"#1c84ee", "isDownload": "N" },
    // { "name": "Pending Withdraw", "value": '0.00', "feather": "pie-chart", "color": this.dkCols?"#be9090":"#ef6767", "isDownload": "N" },
    // { "name": "Pending Call Request", "value": '0', "feather": "bar-chart-2", "color": this.dkCols?"#86afd9":"#ffcc5a", "isDownload": "N" }
  ];
  myDashboardLoading = [false, false, false];
  dIndex = { deposit: 0, withdraw: 0, bonus: 0 };
  dIndex3 = { row: 0, col: 0, status: false };
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[] = [];
  maxDate = new Date();
  maxDateM1 = new Date();
  maxDateM3 = new Date();

  maxDF!: string | null;
  maxDFM1!: string | null;
  maxDFM3!: string | null;

  // maxDF = this.datePipe.transform(this.maxDate, 'MM-dd-yyyy');
  // maxDFM1 = this.datePipe.transform(this.maxDateM1.setMonth(this.maxDateM1.getMonth() - 1), 'MM-dd-yyyy');
  // maxDFM3 = this.datePipe.transform(this.maxDateM3.setDate(1), 'MM-dd-yyyy');
  userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
  userid = JSON.parse(localStorage.getItem('personalDetails')||'{}');
  dynamicControls = [
    { changeAction: 'submit', que: 'wallet', type: 'dropdown', default: parseInt(sessionStorage.getItem('WalChosen')||'{}'), options: this.userWals.map(({ Id, Name, Code }:{Id: any; Name: any; Code: any;}) => ({ op: Name + ' - ' + Code, val: Id })), subque: [] },
    { que: 'Date', type: 'daterange', minDate: null, maxDate: this.maxDate, startDate: this.maxDate, endDate: this.maxDate, subque: [] }
  ];
  dynamicControls2 = [
    { changeAction: 'submit', que: 'wallet', type: 'dropdown', default: parseInt(sessionStorage.getItem('WalChosen')||'{}'), options: this.userWals.map(({ Id, Name, Code }:{Id: any; Name: any; Code: any;}) => ({ op: Name + ' - ' + Code, val: Id })), subque: [] },
    { que: 'Date', type: 'daterange', minDate: null, maxDate: this.maxDate, startDate: this.maxDateM1, endDate: this.maxDate, subque: [] }
  ];
  dynamicControls3 = [
    { changeAction: 'submit', que: 'wallet', type: 'dropdown', default: parseInt(sessionStorage.getItem('WalChosen')||'{}'), options: this.userWals.map(({ Id, Name, Code }:{ Id: any; Name:any; Code:any;}) => ({ op: Name + ' - ' + Code, val: Id })), subque: [] },
    { changeAction: 'submit', que: 'RequestType', type: 'dropdown', default: 0, options: [{ op: 'All', val: '' }, { op: 'Whatsapp', val: 'whatsapp' }, { op: 'Telegram', val: 'telegram' }, { op: 'Live Chat', val: 'livechat' }, { op: 'Call Request', val: 'callrequest' }], subque: [] },
    { changeAction: 'submit', que: 'RequestStatus', type: 'dropdown', default: 0, options: [{ op: 'Open', val: '0' }, { op: 'All', val: '' }, { op: 'Close', val: '1' }], subque: [] },
    { que: 'Date', type: 'daterange', minDate: null, maxDate: this.maxDate, startDate: this.maxDateM3, endDate: this.maxDate, subque: [] }
  ];
  currentQuery = { "StartDateTime": this.maxDF, "EndDateTime": this.maxDF, "SiteCode": sessionStorage.getItem('selectedSite'), "WalletTypeId": sessionStorage.getItem('WalChosen') }
  currentQuery2 = { "StartDateTime": this.maxDFM1, "EndDateTime": this.maxDF, "SiteCode": sessionStorage.getItem('selectedSite'), "WalletTypeId": sessionStorage.getItem('WalChosen') }
  currentQuery3 = { "StartDateTime": this.maxDFM3, "EndDateTime": this.maxDF, "SiteCode": sessionStorage.getItem('selectedSite'), "WalletTypeId": sessionStorage.getItem('WalChosen'), "RequestType": "", "RequestStatus": "0" }
  UserCollumnHeaders: any = [
    [{ value: 'Sr. No.', bg: 'white-drop' },
    { value: 'Category Name', bg: 'white-drop' },
    { value: 'SubCategory Name', bg: 'white-drop' },
    { value: 'Status', bg: 'white-drop' },
    { value: 'Count', bg: 'white-drop' },
    { value: 'Action', bg: 'white-drop' }]
  ]
  AllUserinfo: any = [];
  UserinfoData: any = [];
  rowCount: any = { f: 0, l: 0, t: 0 };
  pageCount = [10, 50, 100, 500, 1000];
  pagesTotal = 1;
  paginatorBlock: any = [];

  UserCollumnLoading = false;
  UserDataCollumns:any = [];
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService, private datePipe: DatePipe) {
    this.maxDateM3.setDate(1);
    this.maxDF = this.datePipe.transform(this.maxDate, 'MM-dd-yyyy');
    this.maxDFM1 = this.datePipe.transform(this.maxDateM1.setMonth(this.maxDateM1.getMonth() - 1), 'MM-dd-yyyy');
    this.maxDFM3 = this.datePipe.transform(this.maxDateM3.setDate(1), 'MM-dd-yyyy');
  }

  ngOnInit(): void {
       // Added by shaunak to Set default dates for page load
  this.currentQuery.StartDateTime = this.currentQuery.StartDateTime || this.maxDF;
  this.currentQuery.EndDateTime = this.currentQuery.EndDateTime || this.maxDF;
  this.GetDashboardCount();

  // Added by shaunak to Set default dates for page load
  this.currentQuery2.StartDateTime = this.currentQuery2.StartDateTime || this.maxDFM1;
  this.currentQuery2.EndDateTime = this.currentQuery2.EndDateTime || this.maxDF;
  this.GetDashboardChart();

   // Added by shaunak to Set default dates for page load
   this.currentQuery3.StartDateTime = this.currentQuery3.StartDateTime || this.maxDFM3;
   this.currentQuery3.EndDateTime = this.currentQuery3.EndDateTime || this.maxDF;
   this.getDashboardChart1();

    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading: any = {}) => {
      this.myDashboardLoading[0] = ('DashBoardCount' in loading) ? true : false;
      this.myDashboardLoading[1] = ('DashboardChart' in loading) ? true : false;
      this.UserCollumnLoading = ('dashboardChart' in loading) ? true : false;
      if (this.dashboardCount[this.dIndex.deposit]) {
        this.dashboardCount[this.dIndex.deposit].btnLoader = ('downloadUserDepositData' in loading) ? true : false;
      }
      if (this.dashboardCount[this.dIndex.withdraw]) {
        this.dashboardCount[this.dIndex.withdraw].btnLoader = ('downloadUserWithdrawData' in loading) ? true : false;
      }
      if (this.dashboardCount[this.dIndex.bonus]) {
        this.dashboardCount[this.dIndex.bonus].btnLoader = ('downloadUserBonusDepositData' in loading) ? true : false;
      }
      if (this.dIndex3.status) {
        this.UserinfoData[this.dIndex3.row][this.dIndex3.col].icon = ('reportDetails' in loading) ? 'Loading' : 'Download';
      }
    });
    // this.GetDashboardCount();
    // this.GetDashboardChart();
    // this.getDashboardChart1();
  }
  setMaxDate(): void {
    this.maxDateM1 = new Date();
    this.maxDateM1.setDate(1); // Sets the date to the 1st of the current month
    console.log(this.maxDateM1); // Outputs the modified date
  }
  GetDashboardCount() {
    //Added by shaunak to assign default dates if they are still null or undefined (just to be safe)
    this.currentQuery2.StartDateTime = this.currentQuery2.StartDateTime || this.maxDFM1;
    this.currentQuery2.EndDateTime = this.currentQuery2.EndDateTime || this.maxDF;

    this.apiSubscriber[0] = this.apiservice.sendRequest(config['getDashboardCount'], this.currentQuery, 'DashBoardCount').subscribe((data: any) => {
      this.dashboardCount[0].value = this.utilities.seperatorNum(data.NewRegisterCount);
      this.dashboardCount[1].value = this.utilities.seperatorNum(data.NewDepositorCount);
      this.dashboardCount[2].value = this.utilities.seperatorNum(data.DepositorCount);
      this.dashboardCount[3].value = this.utilities.seperatorNum(data.TransactionCount);
      this.dashboardCount[4].value = this.utilities.roundOffNum(data.TotalDepositAmount);
      this.dashboardCount[5].value = this.utilities.roundOffNum(data.AverageDepositAmount);
      this.dashboardCount[6].value = this.utilities.roundOffNum(data.TotalWithdrawAmount);
      this.dashboardCount[7].value = this.utilities.roundOffNum(data.DepositWithdrawDiff);
      this.dashboardCount[8].value = this.utilities.roundOffNum(data.TotalDepositBonusAmount);
      this.dashboardCount[9].value = this.utilities.roundOffNum(data.ReverseAmount);
      this.dashboardCount[10].value = this.utilities.roundOffNum(data.WithdrawalPendingAmount);
      this.dashboardCount[11].value = this.utilities.seperatorNum(data.CallRequestPending);

      this.dashboardCount2[0].value = this.utilities.seperatorNum(data.NewRegisterCount);
      this.dashboardCount2[1].value = this.utilities.seperatorNum(data.NewDepositorCount);
      this.dashboardCount2[2].value = this.utilities.seperatorNum(data.DepositorCount);
      this.dashboardCount2[3].value = this.utilities.seperatorNum(data.TransactionCount);
      this.dashboardCount2[4].value = this.utilities.roundOffNum(data.TotalDepositBonusAmount);
      this.dashboardCount2[5].value = this.utilities.roundOffNum(data.ReverseAmount);
      this.dashboardCount2[6].value = this.utilities.roundOffNum(data.WithdrawalPendingAmount);
      this.dashboardCount2[7].value = this.utilities.seperatorNum(data.CallRequestPending);

      this.dashboardCount1[0].value = this.utilities.seperatorNum(data.NewRegisterCount);
      this.dashboardCount1[1].value = this.utilities.seperatorNum(data.NewDepositorCount);
      this.dashboardCount1[2].value = this.utilities.seperatorNum(data.DepositorCount);
      this.dashboardCount1[3].value = this.utilities.seperatorNum(data.TransactionCount);
    }, (error) => {
      console.log(error);
    });
  }

  showTableData() {
    if (this.userid.UserId == '192') {
      return this.dashboardCount1;
    }
    if (this.userid.UserId == '22' || this.userid.UserId == '137') {
      return this.dashboardCount;
    }
    return this.dashboardCount2;
  }
  onValueChange(formVal: any) {
    let d1 = encodeURIComponent(moment(this.currentQuery.StartDateTime).format("DD/MM/yyyy HH:mm"));
    let d2 = encodeURIComponent(moment(this.currentQuery.EndDateTime).format("DD/MM/yyyy HH:mm"));
    if (formVal.type == 'Deposit') {
      this.dIndex.deposit = formVal.id;
      let request = "?StartDateTime=" + d1 + '&EndDateTime=' + d2 + "&SiteCode=" + sessionStorage.getItem('selectedSite') + "&WalletTypeId=" + this.currentQuery.WalletTypeId;
      let docname = 'Download_Deposit_' + moment(this.currentQuery.StartDateTime).format("DD/MM/yyyy") + '_to_' + moment(this.currentQuery.EndDateTime).format("DD/MM/yyyy");
      this.apiservice.exportExcel(config['downloadUserDepositData'] + request, docname, 'downloadUserDepositData');
    }
    else if (formVal.type == 'Withdraw') {
      this.dIndex.withdraw = formVal.id;
      let request = "?StartDateTime=" + d1 + '&EndDateTime=' + d2 + "&SiteCode=" + sessionStorage.getItem('selectedSite') + "&WalletTypeId=" + this.currentQuery.WalletTypeId;
      let docname = 'Download_Withdraw_' + moment(this.currentQuery.StartDateTime).format("DD/MM/yyyy") + '_to_' + moment(this.currentQuery.EndDateTime).format("DD/MM/yyyy");
      this.apiservice.exportExcel(config['downloadUserWithdrawData'] + request, docname, 'downloadUserWithdrawData');
    }
    else if (formVal.type == 'Bonus') {
      this.dIndex.bonus = formVal.id;
      let request = "?StartDateTime=" + d1 + '&EndDateTime=' + d2 + "&SiteCode=" + sessionStorage.getItem('selectedSite') + "&WalletTypeId=" + this.currentQuery.WalletTypeId;
      let docname = 'Download_BonusDeposit_' + moment(this.currentQuery.StartDateTime).format("DD/MM/yyyy") + '_to_' + moment(this.currentQuery.EndDateTime).format("DD/MM/yyyy");
      this.apiservice.exportExcel(config['downloadUserBonusDepositData'] + request, docname, 'downloadUserBonusDepositData');
    }
  }

  getSearchQuery(formVal: any) {
    this.currentQuery.WalletTypeId = formVal.wallet.value;
    sessionStorage.setItem('WalChosen', formVal.wallet.value);
    this.currentQuery.StartDateTime = this.datePipe.transform(formVal.Date.value1, 'MM-dd-yyyy');
    this.currentQuery.EndDateTime = this.datePipe.transform(formVal.Date.value2, 'MM-dd-yyyy');
    this.GetDashboardCount();
  }

  getSearchQuery2(formVal: any) {
    this.currentQuery2.WalletTypeId = formVal.wallet.value;
    sessionStorage.setItem('WalChosen', formVal.wallet.value);
    this.currentQuery2.StartDateTime = this.datePipe.transform(formVal.Date.value1, 'MM-dd-yyyy');
    this.currentQuery2.EndDateTime = this.datePipe.transform(formVal.Date.value2, 'MM-dd-yyyy');
    this.GetDashboardChart();
  }
  getSearchQuery3(formVal: any) {
    this.currentQuery3.WalletTypeId = formVal.wallet.value;
    this.currentQuery3.RequestType = formVal.RequestType.value ? formVal.RequestType.value : "";
    this.currentQuery3.RequestStatus = formVal.RequestStatus.value;
    sessionStorage.setItem('WalChosen', formVal.wallet.value);
    this.currentQuery3.StartDateTime = this.datePipe.transform(formVal.Date.value1, 'MM-dd-yyyy');
    this.currentQuery3.EndDateTime = this.datePipe.transform(formVal.Date.value2, 'MM-dd-yyyy');
    this.getDashboardChart1();
  }

  GetDashboardChart() {
    //Added by shaunak to assign default dates if they are still null or undefined (just to be safe)
    this.currentQuery2.StartDateTime = this.currentQuery2.StartDateTime || this.maxDFM1;
    this.currentQuery2.EndDateTime = this.currentQuery2.EndDateTime || this.maxDF;

    this.apiSubscriber[1] = this.apiservice.sendRequest(config['getDashboardDepositChart'], this.currentQuery2, 'DashboardChart').subscribe((data: any) => {
      var deposit: any = [];
      var withdrawal: any = [];
      var reverse: any = [];
      let label = this.utilities.getDatesInRange(new Date(this.datePipe.transform(this.currentQuery2.StartDateTime, 'MM-dd-yyyy')||''), new Date(this.datePipe.transform(this.currentQuery2.EndDateTime, 'MM-dd-yyyy')||''));
      var displayLable: any = [];

      data.Deposit = data.Deposit || [];

      data.Deposit.forEach((depositElement: any, index: any) => {
        data.Deposit[index]['Date'] = moment(new Date(depositElement.Date)).format("MMM Do YY")
      });

      data.Withdraw = data.Withdraw || [];

      data.Withdraw.forEach((depositElement: any, index: any) => {
        data.Withdraw[index]['Date'] = moment(new Date(depositElement.Date)).format("MMM Do YY")
      });

      data.Reverse = data.Reverse || [];

      data.Reverse.forEach((depositElement: any, index: any) => {
        data.Reverse[index]['Date'] = moment(new Date(depositElement.Date)).format("MMM Do YY")
      });
      label.forEach((element: any) => {
        let depositIndex = data.Deposit.map((x: any) => {
          return x.Date;
        }).indexOf(moment(element).format("MMM Do YY"))
        if (depositIndex != -1) {
          deposit.push(data.Deposit[depositIndex].TotalAmount);
        } else {
          deposit.push(0);
        }
        let widrowIndex = data.Withdraw.map((x: any) => {
          return x.Date;
        }).indexOf(moment(element).format("MMM Do YY"))
        if (widrowIndex != -1) {
          withdrawal.push(data.Withdraw[widrowIndex].TotalAmount);
        } else {
          withdrawal.push(0);
        }
        let reverseIndex = data.Reverse.map((x: any) => {
          return x.Date;
        }).indexOf(moment(element).format("MMM Do YY"))
        if (reverseIndex != -1) {
          reverse.push(data.Reverse[reverseIndex].TotalAmount);
        } else {
          reverse.push(0);
        }
        displayLable.push(moment(element).format("DD  MMM"))
      });
      let basicData = {
        labels: displayLable,
        datasets: [
          { label: 'Deposit', data: deposit, fill: false, borderColor: '#3e95cd', tension: .4 },
          { label: 'Withdrawal', data: withdrawal, fill: false, borderColor: '#87599a', tension: .4 },
          { label: 'Reverse', data: reverse, fill: false, borderColor: '#88f39a', tension: .4 }
        ]
      };
      let chartStatus = Chart.getChart("line_chart");
      if (chartStatus != undefined) {
        chartStatus.destroy();
      }
      const lineCanvasEle: any = document.getElementById('line_chart');
      let tCol = this.dkCols ? '#ddd' : '#666';
      let gCol = this.dkCols ? '#888' : '#e5e5e5';
      let nc = new Chart(lineCanvasEle.getContext('2d'), {
        type: 'line',
        data: basicData,
        options: {
          animation: false,
          responsive: true,
          plugins: {
            legend: { labels: { font: { family: 'BeVietnamPro' }, color: tCol } }
          },
          scales: {
            x: { ticks: { font: { family: 'BeVietnamPro' }, color: tCol }, grid: { color: gCol } },
            y: {
              grid: { color: gCol }, ticks: {
                font: { family: 'BeVietnamPro' }, color: tCol, callback(index) {
                  let numData: any = index;
                  let signage = '';
                  if (numData && numData < 0) {
                    signage = '-';
                    numData = Math.abs(numData);
                  }
                  if (numData && ((numData % 1) != 0)) {
                    let x = numData.toFixed(2);
                    x = x.toString();
                    let afterPoint = '';
                    if (x.indexOf('.') > 0) {
                      afterPoint = x.substring(x.indexOf('.'), x.length);
                    }
                    x = Math.floor(x);
                    x = x.toString();
                    let lastThree = x.substring(x.length - 3);
                    let otherNumbers = x.substring(0, x.length - 3);
                    if (otherNumbers != '') {
                      lastThree = ',' + lastThree;
                    }
                    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
                    return (signage + res);
                  }
                  else if (numData) {
                    let x = numData;
                    x = x.toString();
                    let lastThree = x.substring(x.length - 3);
                    let otherNumbers = x.substring(0, x.length - 3);
                    if (otherNumbers != '') {
                      lastThree = ',' + lastThree;
                    }
                    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
                    return (signage + res);
                  }
                  else {
                    return ('0.00');
                  }
                },
              }
            }
          }
        }
      });
    }, (error) => {
      console.log(error)
    });
  }
  getDashboardChart1() {
    //Added by shaunak to assign default dates if they are still null or undefined (just to be safe)
    this.currentQuery3.StartDateTime = this.currentQuery3.StartDateTime || this.maxDFM3;
    this.currentQuery3.EndDateTime = this.currentQuery3.EndDateTime || this.maxDF;

    this.UserinfoData = []
    this.UserDataCollumns = [];
    this.AllUserinfo = [];
    this.apiSubscriber[2] = this.apiservice.sendRequest(config['dashboardChart'], this.currentQuery3, 'dashboardChart')
      .subscribe((data: any) => {
        this.UserCollumnLoading = false;
        this.AllUserinfo = data;
        if (this.AllUserinfo[0]) {
          this.UserDataCollumns = this.UserCollumnHeaders;
          // this.pagesTotal=Math.ceil(this.AllUserinfo[0].TotalCount/this.currentQuery3.PageSize);
          this.AllUserinfo.forEach((element: any, index: any) => {
            let ctz = element.CreatedDateTZ ? " " + element.CreatedDateTZ : '';
            this.UserinfoData.push([
              // {value:((this.currentQuery3.PageNo-1)*this.currentQuery3.PageSize)+(index+1),bg:'white-cell'},
              { value: (index + 1), bg: 'white-cell' },
              { value: element.CategoryName, bg: 'white-cell' },
              { value: element.SubCategoryName, bg: 'white-cell' },
              {
                bg: 'white-cell', icon: "Multi", value: [
                  { value: 'Open: ' + element.OpenCount, bg: 'white-cell' },
                  { brLine: true },
                  { value: "Close : " + element.CloseCount, bg: 'white-cell' },

                ]
              },
              { value: element.RequestCount, bg: 'white-cell' },
              { value: '', bg: 'white-cell', icon: 'Download', downloadvalue: "Download" },
            ])
          });
          this.rowCount = { f: this.UserinfoData[0][0].value, l: this.UserinfoData[this.UserinfoData.length - 1][0].value, t: this.AllUserinfo[0].TotalCount };
          // this.setPaginator();
        }
        else {
          this.rowCount = { f: 0, l: 0, t: 0 };
          this.UserDataCollumns = this.utilities.TableDataNone;
        }
      }, (error) => {
        console.log(error);
      });

  }
  onValueChange1(formVal: any) {
    if (formVal.type == 'Download') {
      this.dIndex3.status = true;
      this.dIndex3.row = formVal.row;
      this.dIndex3.col = formVal.col;
      let param = this.AllUserinfo[formVal.row].SubCategoryName;
      this.downloadexceldata(param);
    }
  }
  downloadexceldata(id: any) {
    let status = this.currentQuery3.RequestStatus ? this.currentQuery3.RequestStatus : 2;
    let start = moment(this.currentQuery3.StartDateTime).format('DD/MM/YYYY 00:00');
    let end = moment(this.currentQuery3.EndDateTime).format('DD/MM/YYYY 00:00');
    let param = '?SubCategoryName=' + id + '&RequestType=' + this.currentQuery3.RequestType + '&RequestStatus=' + status + '&StartDateTime=' + start + '&EndDateTime=' + end + '&WalletTypeId=' + this.currentQuery3.WalletTypeId + '&SiteCode=' + sessionStorage.getItem('selectedSite')
    this.apiservice.exportExcel(config['reportDetails'] + param, 'reportDetails');
  }
  ngOnDestroy() {
    if (this.apiSubscriber[0]) {
      this.apiSubscriber[0].unsubscribe();
    }
    if (this.apiSubscriber[1]) {
      this.apiSubscriber[1].unsubscribe();
    }
    if (this.loaderSubscriber) {
      this.loaderSubscriber.unsubscribe();
    }
  }
}
