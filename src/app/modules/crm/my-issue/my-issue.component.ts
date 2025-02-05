import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { config } from '@services/config';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { AddCommentsComponent } from '../add-comments/add-comments.component';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-my-issue',
  imports: [
    AddCommentsComponent,
    ModulesModule
  ],
  templateUrl: './my-issue.component.html',
  styleUrl: './my-issue.component.scss'
})
export class MyIssueComponent implements OnInit {
  submitDisabled: boolean = false;
  priority: any = [];
  status: any = [];
  category: any = [];
  adminAll: any = [];
  RolesList = [];
  UserCollumnLoading = false;
  maxDate = new Date();
  minDate = new Date();
  updateVal:boolean = false;
  userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');

  rowCount: any = { f: 0, l: 0, t: 0 };
  dateValue: any = [new Date(), new Date()];
  issueDetails:any;
  @ViewChild('comment') comment!: TemplateRef<any>;
  UserCollumnHeaders: any = [
    [{ value: 'Sr. No.', bg: 'white-drop' }, { value: 'Title', bg: 'white-drop' }, { value: 'Description', bg: 'white-drop' }, { value: 'Category', bg: 'white-drop' }, { value: 'Prority', bg: 'white-drop' }, { value: 'Status', bg: 'white-drop' }, { value: 'DeadLine Date', bg: 'white-drop' }, { value: 'Assign', bg: 'white-drop' }, { value: 'Action', bg: 'white-drop' }]
  ]
  dynamicControls: any = [];
  UserDataCollumns: any = [];
  UserinfoData: any = [];
  AllUserinfoData: any = [];
  pageCount = [10, 50, 100, 500, 1000];
  pagesTotal = 1;
  paginatorBlock: any = [];
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[] = [];
  selectedFiles: File[] = [];
  dIndex={status:{row:0,col:0,use:false},assign:{row:0,col:0,use:false}};
  currentQuery = { "Search": "", "PageNo": 1, "PageSize": this.pageCount[0], "startDateTime": this.dateValue[0], "endDateTime": this.dateValue[1], "statusCode": "", "category": "", "priority": "", "SiteCode": sessionStorage.getItem('selectedSite')};
  constructor(private formBuilder: FormBuilder, private apiSer: ApiService, private utilities: CommonFunctionService,private dialog:MatDialog) { }
  ngOnInit() {
    this.getAdminAll();
    this.getCategory();
    this.getStatus();
    this.getPriority();
    this.intializeData();
    this.getAll();
    this.loaderSubscriber = this.apiSer.loaderService.loading$.subscribe((loading: any = {}) => {
      this.UserCollumnLoading = ('myissue' in loading) ? true : false;
      if(this.dIndex.status.use)
      {
        this.UserinfoData[this.dIndex.status.row][this.dIndex.status.col].loader=('changeStatus' in loading)?true:false;
      }
      if(this.dIndex.assign.use)
      {
        this.UserinfoData[this.dIndex.assign.row][this.dIndex.assign.col].loader=('assignIssue' in loading)?true:false;
      }
    });

  }
  intializeData() {
    
    // if (this.priority && this.priority.length > 0) {
      this.dynamicControls = [
        { changeAction: 'submit', que: 'priority', type: 'dropdown', default: '', options: [{ op: 'All Priorities', val: '' }, ...this.priority.map((value:any) => ({ op: value.name, val: value.code }))], subque: [] },
        { changeAction: 'submit', que: 'status', type: 'dropdown', default: '', options: [{ op: 'All Status', val: '' }, ...this.status.map((value:any) => ({ op: value.name, val: value.code }))], subque: [] },
        { changeAction: 'submit', que: 'category', type: 'dropdown', default: '', options: [{ op: 'All Categories', val: '' }, ...this.category.map((value:any) => ({ op: value.name, val: value.code }))], subque: [] },
        { que: 'Date', type: 'daterange', minDate: null, maxDate: this.maxDate, startDate: this.maxDate, endDate: this.maxDate, subque: [] },
        { que: 'Search', type: 'input', subque: [] }
      ];
    // }

  }
  getAdminAll() {
    this.apiSer.crmsendRequest(config['getcrmAdmin'], 'getcrmAdmin').subscribe({
      next: data => {
        this.adminAll = data
        this.intializeData();
      },
      error: err => {
        console.error(err);
      }
    })
  }
  initializeForm() {
   
  }
  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  onValueChange(formVal: any) {
    if (formVal.col == 5) {
      this.dIndex.status.use = true; 
      this.dIndex.status.row = formVal.row; 
      this.dIndex.status.col = formVal.col; 
      let id = this.AllUserinfoData[formVal.row].id
      let param = {
        statusCode: formVal.value,
        id: id
      }
      this.ChangeStatus(param);
    }else if (formVal.col == 7) {
      this.dIndex.assign.use = true; 
      this.dIndex.assign.row = formVal.row; 
      this.dIndex.assign.col = formVal.col; 
      let id = this.AllUserinfoData[formVal.row].id
      let param = {
        assignId: formVal.value,
        crM_Issue_Tracker_Id: id
      }
      this.AssignIssue(param);
    }else if (formVal.col == 8) {
      this.issueDetails = this.AllUserinfoData[formVal.row];
      this.CommentPop();
     
    }

  }
  CommentPop(){
    let dialogRef = this.dialog.open(this.comment, {
      width: '800px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {})
  }
  ChangeStatus(param:any){
    this.apiSer.crmsendRequest(config['changeStatus'], param, 'changeStatus').subscribe({
      next: (data: any) => {
        if (data.errorCode == '1') {
          this.utilities.toastMsg('success', "Success", data.errorMessage);
          this.getAll();
        }
      },
      error: err => {
        console.error(err);
      }
    });

  }
  AssignIssue(param: any) {
    this.apiSer.crmsendRequest(config['assignIssue'], param, 'assignIssue').subscribe({
      next: (data: any) => {
        if (data.errorCode == '1') {
          this.utilities.toastMsg('success', "Success", data.errorMessage);
          this.getAll();
        }
      },
      error: err => {
        console.error(err);
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
    this.getAll();
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
  getSearchQuery(formVal: any) {
    this.currentQuery.Search = formVal.Search.value ? formVal.Search.value : '';
    this.currentQuery.priority = formVal.priority.value;
    this.currentQuery.category = formVal.category.value;
    this.currentQuery.statusCode = formVal.status.value;
    this.currentQuery.startDateTime = moment(formVal.Date.value1).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    this.currentQuery.endDateTime = moment(formVal.Date.value2).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    // console.log(this.currentQuery.startDateTime);
    console.log(moment(formVal.Date.value1).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"));
    this.currentQuery.PageNo = 1;
    // this.currentQuery.endDateTime = moment(formVal.Date.value2).format("YYYY-MM-DD HH:mm");
    this.getAll();
  }
  getAll() {
    this.UserinfoData = [];
    this.AllUserinfoData = [];
    this.apiSer.crmsendRequest(config['myissue'], this.currentQuery, 'myissue').subscribe({
      next: data => {
        this.AllUserinfoData = data;
        if (this.AllUserinfoData[0]) {
          this.UserDataCollumns = this.UserCollumnHeaders;
          this.AllUserinfoData.forEach((element: any, index: any) => {
            this.UserinfoData.push([
              { value: index + 1, bg: 'white-cell' },
              { value: element.title, bg: 'white-cell' },
              { value: element.description, bg: 'white-cell' },
              { value: element.categoryName, bg: 'white-cell' },
              { value: element.priorityName, bg: 'white-cell' },
              { value: 'name', bg: 'white-cell', refArray: this.status, sKey: 'code', sValue: element.statusCode, icon: 'EditDropdown', loader: false },
              { value: element.deadLineDate ? moment(element.deadLineDate).format('YYYY-MM-DD') : '', bg: 'white-cell' },
              { value: 'fullName', bg: 'white-cell', refArray: this.adminAll, sKey: 'id', sValue: element.adminId, icon: 'EditDropdown', loader: false },
             { value: 'Comment', bg: 'wite-cell', icon: 'None' },
              // {value:'1',bg:'white-cell',icon:'Toggle'},
              // {value:element.DepositAccess,bg:'white-cell',icon:'Toggle'},
              // ...(element.DepositAccess?[{value:element.IMPSAccess,bg:'white-cell',icon:'Toggle'}]:[{value:'',bg:'white-cell'}])
            ])
          });
          this.rowCount = { f: this.UserinfoData[0][0].value, l: this.UserinfoData[this.UserinfoData.length - 1][0].value, t: this.AllUserinfoData[0].TotalCount };
          this.setPaginator();
        }
        else {
          this.UserDataCollumns = this.utilities.TableDataNone;
        }
      },
      error: err => {
        console.error(err);
      }
    })

  }


  getCategory() {
    this.apiSer.crmgetRequest(config['getIssueCategoryList'], 'getIssueCategoryList').subscribe({
      next: data => {
        this.category = data;
        this.intializeData();
      },
      error: err => {
        console.error(err);
      }
    })
  }
  getPriority() {
    this.apiSer.crmgetRequest(config['getPriorityList'], 'getPriorityList').subscribe({
      next: data => {
        this.priority = data;
        this.intializeData();
      },
      error: err => {
        console.error(err);
      }
    })
  }
  getStatus() {
    this.apiSer.crmgetRequest(config['getIssueStatusList'], 'getIssueStatusList').subscribe({
      next: data => {
        this.status = data;
        this.intializeData();
      },
      error: err => {
        console.error(err);
      }
    })
  }

}
