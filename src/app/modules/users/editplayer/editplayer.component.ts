import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { EditplayerDetailsComponent } from '../editplayer-details/editplayer-details.component';
import { ResetUserpasswordComponent } from '../reset-userpassword/reset-userpassword.component';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-editplayer',
  imports: [
    EditplayerDetailsComponent,
    ResetUserpasswordComponent,
    ModulesModule
  ],
  templateUrl: './editplayer.component.html',
  styleUrl: './editplayer.component.scss'
})
export class EditplayerComponent implements OnInit {
  @ViewChild('EditPlayerDialogOpen') EditPlayerDialogOpen!: TemplateRef<any>;
  @ViewChild('ResetPasswordDialogOpen') ResetPasswordDialogOpen!: TemplateRef<any>;
  AllUserinfo: any = [];
  UserinfoData: any = [];
  rowCount: any = { f: 0, l: 0, t: 0 };
  pageCount = [10];
  pagesTotal = 1;
  paginatorBlock: any = [];
  dynamicControls = [{ placeholder: 'Search', type: 'text', label: 'Search' }];
  UserCollumnHeaders: any = [
    [{ value: 'Sr. No.', bg: 'white-drop' }, { value: 'Id', bg: 'white-drop' }, { value: 'Name', bg: 'white-drop' }, { value: 'User Name', bg: 'white-drop' }, { value: 'Mobile', bg: 'white-drop' }, { value: 'Amount', bg: 'white-drop' }, { value: 'DOB', bg: 'white-drop' }, { value: 'Date', bg: 'white-drop' }, { value: 'Action', bg: 'white-drop' }, { value: 'Reset', bg: 'white-drop' }]
  ]
  UserDataCollumns = this.UserCollumnHeaders;
  UserCollumnLoading = false;
  // currentQuery = { "Search": "", "Pagination": 1, "SiteCode": sessionStorage.getItem('selectedSite'), "WalletTypeId": sessionStorage.getItem('WalChosen') };
  currentQuery = { "Search": "", "Pagination": 1, "SiteCode": sessionStorage.getItem('selectedSite'), "WalletTypeId": Number(sessionStorage.getItem('WalChosen')) };

  udataToView: { DOB?: string } = {};

  constructor(private apiservice: ApiService, private utilities: CommonFunctionService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetAllUsers();
  }

  initializeData() {
    this.UserCollumnLoading = true;
    this.AllUserinfo = [];
    this.UserinfoData = [];
    // this.currentQuery.WalletTypeId = sessionStorage.getItem('WalChosen');
    this.currentQuery.WalletTypeId = Number(sessionStorage.getItem('WalChosen'));

  }

  onPaginatorChange(paginatorQuery: any) {
    if (paginatorQuery.action == 'pageNo') {
      this.currentQuery.Pagination = paginatorQuery.pageNo;
    }
    this.GetAllUsers();
  }

  GetAllUsers() {
    this.initializeData();
    this.apiservice.sendRequest(config['getAllPlayerForEdit'], this.currentQuery).subscribe((data: any) => {
      this.UserCollumnLoading = false;
      this.AllUserinfo = data;
      if (this.AllUserinfo[0]) {
        this.UserDataCollumns = this.UserCollumnHeaders;
        this.pagesTotal = Math.ceil(this.AllUserinfo[0].TotalCount / this.pageCount[0]);
        this.AllUserinfo.forEach((element: any, index: any) => {
          let ctz = element.CreatedDateTZ ? " " + element.CreatedDateTZ : '';
          this.UserinfoData.push([
            { value: ((this.currentQuery.Pagination - 1) * this.pageCount[0]) + (index + 1), bg: 'white-cell' },
            { value: element.UserId, bg: 'white-cell' },
            { value: element.FName, bg: 'white-cell' },
            { value: element.UserName, bg: 'white-cell' },
            { value: element.Mobile, bg: 'white-cell' },
            { value: element.CurrencyType + ' ' + this.utilities.roundOffNum(element.AccountBalance), bg: 'white-cell' },
            { value: element.DOB ? moment(element.DOB).format("h:mm:ss A, DD-MMM-yyyy") : '', bg: 'white-cell' },
            { value: element.CreatedDate ? moment(element.CreatedDate).format("h:mm:ss A, DD-MMM-yyyy") + ctz : '', bg: 'white-cell' },
            { value: '', bg: 'white-cell', icon: 'feather', iconvalue: 'edit-2' },
            { value: '', bg: 'white-cell', icon: 'feather', iconvalue: 'key' }
          ])
        });
        this.rowCount = { f: this.UserinfoData[0][0].value, l: this.UserinfoData[this.UserinfoData.length - 1][0].value, t: this.AllUserinfo[0].TotalCount };
        this.setPaginator();
      }
      else {
        this.rowCount = { f: 0, l: 0, t: 0 };
        this.UserDataCollumns = this.utilities.TableDataNone;
      }
    }, (error) => {
      this.UserCollumnLoading = false;
      console.log(error);
    });
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

  onValueChange(formVal: any) {
    if (formVal.type == 'edit-2') {
      this.udataToView = this.AllUserinfo[formVal.row];
      this.udataToView['DOB'] = moment(this.udataToView['DOB']).format("yyyy-MM-DD");
      this.EditPlayerOpenPopup();
    }
    else if (formVal.type == 'key') {
      this.udataToView = this.AllUserinfo[formVal.row];
      this.ResetPasswordOpenPopup();
    }
  }

  getSearchQuery(formVal: any) {
    this.currentQuery.Search = formVal.C0;
    this.currentQuery.Pagination = 1;
    this.GetAllUsers();
  }

  EditPlayerOpenPopup() {
    let dialogRef = this.dialog.open(this.EditPlayerDialogOpen, {
      width: '800px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => { })
  }

  ResetPasswordOpenPopup() {
    let dialogRef = this.dialog.open(this.ResetPasswordDialogOpen, {
      width: '800px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => { })
  }

  closePopup() {
    this.dialog.closeAll();
  }
}