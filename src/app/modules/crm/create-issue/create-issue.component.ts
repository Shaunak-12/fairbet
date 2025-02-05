import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { config } from '@services/config';
import moment from 'moment';
import { Subscription } from 'rxjs';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { AddCommentsComponent } from '../add-comments/add-comments.component';
import { ModulesModule } from '@modules/modules/modules.module';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
  },
};
@Component({
  selector: 'app-create-issue',
  imports: [AddCommentsComponent,
    ModulesModule
  ],
  templateUrl: './create-issue.component.html',
  styleUrl: './create-issue.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class CreateIssueComponent implements OnInit {
  @ViewChild('scrollTarget') scrollTarget!: ElementRef;
  issueDetails:any;
  @ViewChild('comment') comment!: TemplateRef<any>;
  createIssue!: FormGroup;
  submitDisabled: boolean = false;
  priority: any = [];
  status: any = [];
  category: any = [];
  adminAll: any = [];
  RolesList = [];
  UserCollumnLoading = false;
  loading = false;
  toDay = new Date();
  maxDate = new Date();
  minDate = new Date();
  updateVal: boolean = false;
  userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
  fileCount: number = 0;
  dIndex={assign:{row:0,col:0,use:false}};
  rowCount:any = { f: 0, l: 0, t: 0 };
  dateValue: any = [new Date(), new Date()];
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
  currentQuery = { "Search": "", "PageNo": 1, "PageSize": this.pageCount[0], "startDateTime": this.dateValue[0], "endDateTime": this.dateValue[1], "statusCode": "", "category": "", "priority": "", "SiteCode": sessionStorage.getItem('selectedSite') };
  constructor(private formBuilder: FormBuilder, private apiSer: ApiService, private utilities: CommonFunctionService , private elementRef:ElementRef,private dialog:MatDialog) { }
  ngOnInit() {
    this.getAdminAll();
    this.getCategory();
    this.getStatus();
    this.getPriority();
    this.intializeData();
    this.getAll();
    this.initializeForm();
    this.loaderSubscriber = this.apiSer.loaderService.loading$.subscribe((loading: any = {}) => {
      this.UserCollumnLoading = ('getAllCRMIssue' in loading) ? true : false;
      this.submitDisabled = ('createIssue' in loading) ? true : false;
      this.loading  = ('getIssueStatusList' in loading || 'getPriorityList' in loading || 'getIssueCategoryList' in loading) ? true : false;
      if(this.dIndex.assign.use)
      {
        this.UserinfoData[this.dIndex.assign.row][this.dIndex.assign.col].loader=('assignIssue' in loading)?true:false;
      }
    });

  }
  intializeData() {
    if (this.priority && this.priority.length > 0) {
      this.dynamicControls = [
        { changeAction: 'submit', que: 'priority', type: 'dropdown', default: '', options: [{ op: 'All Priorities', val: '' }, ...this.priority.map((value:any) => ({ op: value.name, val: value.code }))], subque: [] },
        { changeAction: 'submit', que: 'status', type: 'dropdown', default: '', options: [{ op: 'All Status', val: '' }, ...this.status.map((value: any) => ({ op: value.name, val: value.code }))], subque: [] },
        { changeAction: 'submit', que: 'category', type: 'dropdown', default: '', options: [{ op: 'All Categories', val: '' }, ...this.category.map((value: any) => ({ op: value.name, val: value.code }))], subque: [] },
        { que: 'Date', type: 'daterange', minDate: null, maxDate: this.maxDate, startDate: this.maxDate, endDate: this.maxDate, subque: [] },
        { que: 'Search', type: 'input', subque: [] }
      ];
    }
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
    this.createIssue = this.formBuilder.group({
      id: [""],
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      deadLineDate: [this.toDay, [Validators.required]],
      priority: ["", [Validators.required]],
      statusCode: ["", [Validators.required]],
      category: ["", [Validators.required]],
      assignId: ["0"],
      Files: [null],
      SiteCode: [sessionStorage.getItem('selectedSite')]
    });
  }

  resetForm() {
    this.createIssue.reset();
    this.createIssue.controls['category'].setValue('');
    this.createIssue.controls['statusCode'].setValue('');
    this.createIssue.controls['priority'].setValue('');
    this.createIssue.controls['assignId'].setValue('');
    this.createIssue.controls['deadLineDate'].setValue(this.toDay);
    this.fileCount = 0;
    this.createIssue.markAsPristine();
    this.createIssue.markAsUntouched();
    // If needed, reset form controls individually to default values
    Object.keys(this.createIssue.controls).forEach(key => {
      this.createIssue.get(key)?.setErrors(null);
    });
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    let param = this.createIssue.getRawValue();
    if (param.id === '' || param.id === null) {
      delete param.id;
    }
    let formData = new FormData();
    if (param.id) {
      formData.append('id', param.id);
    }
    formData.append('title', param.title);
    formData.append('priority', param.priority);
    formData.append('statusCode', param.statusCode);
    formData.append('category', param.category);
    formData.append('description', param.description);
    formData.append('assignId', param.assignId);
    formData.append('deadLineDate', moment(param.deadLineDate).format('MM-DD-yyyy HH:mm:ss'));
    for (let file of this.selectedFiles) {
      formData.append('Files', file, file.name);
    }
    let url = '';
    if (this.updateVal) {
      url = config['updateIssue'];
    } else {
      url = config['createIssue'];
    }
    this.apiSer.crmsendRequest(url, formData, 'createIssue').subscribe({
      next: (data: any) => {
        if (data.errorCode == '1') {
          this.utilities.toastMsg('success', "Success", data.errorMessage);
          this.resetForm();
          this.getAll();
          this.updateVal = false;
        }
      },
      error: err => {
        console.error(err)
      }
    });

    
  }
  onValueChange(formVal: any) {
    if (formVal.col == 7) {
      this.dIndex.assign.use = true;
      this.dIndex.assign.row = formVal.row;
      this.dIndex.assign.col = formVal.col;
      let id = this.AllUserinfoData[formVal.row].id
      let param = {
        assignId: Number(formVal.value),
        crM_Issue_Tracker_Id: id
      }
      this.AssignIssue(param);
    } else if (formVal.col == 8 && formVal.type== 'Update') {
      let param = this.AllUserinfoData[formVal.row];
      this.updateForm(param);
    }
    else if (formVal.col == 8 && formVal.type== 'Comment') {
      this.issueDetails = this.AllUserinfoData[formVal.row];
      this.CommentPop();
     
    }
  }

  updateForm(param: any) {
    if (this.scrollTarget) {
      this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.updateVal = true;
    // console.log(param.fileName);
    this.fileCount = param.fileName?param.fileName.split(',').length:0
    this.createIssue.patchValue({
      title: param.title,
      deadLineDate: param.deadLineDate,
      description: param.description,
      priority: param.priority,
      statusCode: param.statusCode,
      category: param.category,
      assignId: String(param.adminId),
      id: param.id,
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
    })
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
    this.getAll();
  }

  getAll() {
    this.UserinfoData = [];
    this.AllUserinfoData = [];
    this.apiSer.crmsendRequest(config['getAllCRMIssue'], this.currentQuery, 'getAllCRMIssue').subscribe({
      next: data => {
        this.AllUserinfoData = data;
        if (this.AllUserinfoData[0]) {
          this.UserDataCollumns = this.UserCollumnHeaders;
        this.pagesTotal=Math.ceil(this.AllUserinfoData[0].totalCount/this.currentQuery.PageSize);
          this.AllUserinfoData.forEach((element: any, index: any) => {
            this.UserinfoData.push([
              {value:((this.currentQuery.PageNo-1)*this.currentQuery.PageSize)+(index+1),bg:'white-cell'},
              { value: element.title, bg: 'white-cell' },
              { value: element.description, bg: 'white-cell' },
              { value: element.categoryName, bg: 'white-cell' },
              { value: element.priorityName, bg: 'white-cell' },
              { value: element.statusCodeName, bg: 'white-cell' },
              { value: element.deadLineDate ? moment(element.deadLineDate).format('YYYY-MM-DD') : '', bg: 'white-cell' },
              { value: 'fullName', bg: 'white-cell', refArray: this.adminAll, sKey: 'id', sValue: element.adminId, icon: 'EditDropdown', loader: false },
              {bg:'white-cell',icon:'Multi',value:[
                ...([{ value: 'Update', bg: 'wite-cell', icon: 'None' }]),
                ...([{ value: 'Comment', bg: 'wite-cell', icon: 'None' }]),
            ]}
            ])
          });
          this.rowCount = { f: this.UserinfoData[0][0].value, l: this.UserinfoData[this.UserinfoData.length - 1][0].value, t: this.AllUserinfoData[0].totalCount };
          this.setPaginator();
        }
        else {
          this.rowCount={f:0,l:0,t:0};
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
  CommentPop(){
    let dialogRef = this.dialog.open(this.comment, {
      width: '800px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {})
  }

}
