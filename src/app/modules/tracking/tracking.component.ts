
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';
import { AdvanceTableComponent } from '@shared/advance-table/advance-table.component';
import { AdvanceTitleHeadNewComponent } from '@shared/advance-title-head-new/advance-title-head-new.component';

@Component({
  selector: 'app-tracking',
  imports: [
    AdvanceTitleHeadNewComponent,
    AdvanceTableComponent,
    ModulesModule
  ],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.scss',
  providers: [DatePipe]

})
export class TrackingComponent implements OnInit, OnDestroy {

  dkCols = localStorage.getItem('dkMode') == 'sd-dark' ? true : false;
  dIndex = { deposit: 0, withdraw: 0, bonus: 0 };
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[] = [];
  maxDate = new Date();
  userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
  userid = JSON.parse(localStorage.getItem('personalDetails')||'{}');
  submitDisabled: string = ''
  dynamicControls = [
    { que: 'trackingDate', type: 'date', defaultDate: this.maxDate, maxDate: this.maxDate, startDate: this.maxDate, subque: [] }
  ];
  // currentQuery = { "trackingDate": this.datePipe.transform(this.maxDate, 'YYYY-MM-dd') }
  currentQuery: any = {};

  UserCollumnHeaders: any =
    [
      [{ value: 'S. No.', bg: 'white-drop' },
      { value: 'UserId', bg: 'white-drop' },
      { value: 'UserName', bg: 'white-drop' },
      { value: 'LoginDateTime', bg: 'white-drop' },
      { value: 'TotalBreak', bg: 'white-drop' },
      { value: 'BreakTime', bg: 'white-drop' },
      { value: 'LunchBreak', bg: 'white-drop' },
      { value: 'LogoutTime', bg: 'white-drop' }]
    ];
  AllUserinfo: any[] = [];
  UserinfoData: { value: any; bg: string; }[][] = [];
  rowCount: any= { f: 0, l: 0, t: 0 };
  pageCount = [10, 50, 100, 500, 1000];
  pagesTotal = 1;
  paginatorBlock: any = [];

  UserCollumnLoading = false;
  UserDataCollumns: any[] = [];

  buttonData: any = {};
  buttonstatusDisabled: any = {};

  constructor(private apiservice: ApiService, private utilities: CommonFunctionService, private datePipe: DatePipe) {
    this.currentQuery = { "trackingDate": this.datePipe.transform(this.maxDate, 'YYYY-MM-dd') }

   }

  ngOnInit(): void {
    this.GetButtonStatus();
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading: any = {}) => {
      this.UserCollumnLoading = ('getusertrackingdetails' in loading) ? true : false;
    });
    this.GetUserDetails();
  }
  getSearchQuery(formVal: any) {
    this.currentQuery.trackingDate = this.datePipe.transform(formVal.trackingDate.value, 'YYYY-MM-dd');
    this.GetUserDetails();
  }
  GetButtonStatus() {
    this.apiservice.getRequest(config['getbuttonstatus'], 'getbuttonstatus').subscribe({
      next: (data) => {
        this.buttonData = data
        console.log(this.buttonData);
        this.updateButtonStates();

      },
      error(err) {
        console.error('Error:', err);
      },
    });
  }
  updateButtonStates() {
    this.buttonstatusDisabled = {
      Break: this.buttonData.BreakStatus === 1,
      BreakBack: this.buttonData.BreakBackStatus === 1,
      LunchBreak: this.buttonData.LunchStatus === 1,
      LunchBack: this.buttonData.LunchBackStatus === 1,
      WeekOff: this.buttonData.WeekOff === 1,
      Absent: this.buttonData.WorkAbsent === 1,
    };
  }
  isDisabled(buttonType: any): boolean {
    const statusKeyMap: { [key: string]: any } = {
      Break: 'BreakStatus',
      BreakBack: 'BreakBackStatus',
      LunchBreak: 'LunchStatus',
      LunchBack: 'LunchBackStatus',
      WeekOff: 'WeekOff',
      Absent: 'WorkAbsent',
    };

    return this.submitDisabled === buttonType || this.buttonData[statusKeyMap[buttonType]] === 1;
  }

  GetUserDetails() {
    this.UserinfoData = [];
    this.UserDataCollumns = [];
    this.AllUserinfo = [];
    const queryParams = new URLSearchParams(this.currentQuery).toString();
    const url = `${config['getusertrackingdetails']}?${queryParams}`;

    this.apiSubscriber[1] = this.apiservice.getRequest(url, 'getusertrackingdetails').subscribe(
      (data: any) => {
        this.AllUserinfo = Array.isArray(data) ? data : [];
        if (this.AllUserinfo.length > 0) {
          this.UserDataCollumns = this.UserCollumnHeaders;
          const defaultCellStyle = 'white-cell';
          this.UserinfoData = this.AllUserinfo.map((element: any, index: number) => [
            { value: index + 1, bg: defaultCellStyle },
            { value: element.UserId, bg: defaultCellStyle },
            { value: element.UserName, bg: defaultCellStyle },
            { value: element.LoginDateTime, bg: defaultCellStyle },
            { value: element.TotalBreak, bg: defaultCellStyle },
            { value: element.BreakTime, bg: defaultCellStyle },
            { value: element.LunchBreak, bg: defaultCellStyle },
            { value: element.LogoutTime, bg: defaultCellStyle }
          ]);
          this.rowCount = { f: 1, l: 1, t: this.AllUserinfo.length };
        } else {
          this.rowCount = { f: 0, l: 0, t: 0 };
          this.UserDataCollumns = this.utilities.TableDataNone;
        }
      },
      (error) => {
        console.error(error);
        this.utilities.toastMsg('warning', '', 'Failed to fetch user details. Please try again later.');
      }
    );
  }
  onValueChange(formVal: any) {
    this.GetUserDetails();
  }
  track(type: string) {
    let param = {
      TrackingType: type
    };
    this.submitDisabled = type;
    const queryParams = new URLSearchParams(param).toString();
    const url = `${config['SaveUserTrackingDetails']}?${queryParams}`;
    this.apiSubscriber[0] = this.apiservice.getRequest(url, 'SaveUserTrackingDetails').subscribe(
      (data: any) => {
        if (data.ErrorCode == '1') {
          this.utilities.toastMsg('success', data.Result, data.ErrorMessage)
          this.submitDisabled = '';
          // window.location.reload();
        } else {
          this.utilities.toastMsg('warning', data.Result, data.ErrorMessage)
          this.submitDisabled = '';
        }
        this.submitDisabled = '';
        this.GetButtonStatus();
      },
      (error) => {
        console.error(`Error tracking ${type}:`, error);
        // this.submitDisabled = ''; 
      }
    );
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
