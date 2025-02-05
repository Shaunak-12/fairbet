import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { AddAdminDetailsComponent } from '../add-admin-details/add-admin-details.component';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-add-admin',
  imports: [
    AddAdminDetailsComponent,
    ModulesModule
  ],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.scss'
})
export class AddAdminComponent implements OnInit {
  @ViewChild('AddAdminDialogOpen') AddAdminDialogOpen!: TemplateRef<any>;
  AllAdmininfo:any=[];
  AdmininfoData:any=[];
  maxDate = new Date();
  siteCode = sessionStorage.getItem('selectedSite')
  // dynamicControls = [
  //   {changeAction:'submit',type:'select',default:{value:"Daily",name:'Daily'},options:[{value:"Daily",name:'Daily'},{value:"Monthly",name:'Monthly'}]},
  //   {changeAction:'submit',type:'select',default:{value:"Daily",name:'Daily'},options:[{value:"Daily",name:'Daily'},{value:"Monthly",name:'Monthly'}]},
  //   {changeAction:'submit',type:'select',default:{value:"-1",name:'All Status'},options:[{value:"1",name:'Active'},{value:"0",name:'Blocked'}]},
  //   {changeAction:'submit',type:'select',default:{value:"0",name:'All Roles'},options:[]},
  //   {placeholder:'Search',type:'text',label:'Search'}
  // ];
  dynamicControls = [
    { changeAction: 'submit', que: 'Type', type: 'dropdown', default: '', options: [{val:"Daily",op:'Daily'},{val:"Monthly",op:'Monthly'}], subque: [] },
    { que: 'StartDateTime', type: 'date', defaultDate: this.maxDate, maxDate: this.maxDate, startDate: this.maxDate, subque: [] },
    { changeAction: 'submit', que: 'status', type: 'dropdown', default:0, options: [{val:"-1",op:'All Status'},{val:"1",op:'Active'},{val:"0",op:'Blocked'}], subque: [] },
    { changeAction: 'submit', que: 'role', type: 'dropdown', default: 0, options: [{val:"0",op:'All Roles'}], subque: [] },
    { que: 'Search', type: 'input', subque: [] }
  ];
  AdminCollumnHeaders:any = [
    [{value:'Sr. No.',bg:'white-drop'},{value:'Name',bg:'white-drop'},{value:'Gender',bg:'white-drop'},
    {value:'Mobile',bg:'white-drop'},{value:'Email',bg:'white-drop'},{value:'Role',bg:'white-drop'},
    {value:'Depost/Withdraw',bg:'white-drop'},{value:'Profit',bg:'white-drop'},
    {value:'Status',bg:'white-drop'},{value:'Deposit Access',bg:'white-drop'},{value:'IMPS Access',bg:'white-drop'},{value:'Action',bg:'white-drop'}]
  ];
  AdminDataCollumns: { value: string; bg: string; }[][] = [];
  currentQuery={ "Search": "", "intParam1": "-1", "intParam2": "0","SiteCode":sessionStorage.getItem('selectedSite'),"Type":"","StartDateTime":moment(this.maxDate).format('YYYY-MM-DD HH:mm:ss')};
  RolesList=[];
  userid = JSON.parse(localStorage.getItem('personalDetails')||'{}');
  addadminloader={getAdminRoles:false,getAllAdmins:false};
  dIndex={status:{row:0,col:0,use:false},depositAccess:{row:0,col:0,use:false},IMPSAccess:{row:0,col:0,use:false},roleChange:{row:0,col:0,use:false}};
  private loaderSubscriber!: Subscription;
  private apiSubscriber: Subscription[]=[];
  constructor(private apiservice: ApiService, private utilities: CommonFunctionService, private dialog: MatDialog) { }
  ngOnInit(): void
  {
    this.loaderSubscriber = this.apiservice.loaderService.loading$.subscribe((loading:any={}) => {
      this.addadminloader.getAdminRoles=('getAdminRoles' in loading)?true:false;
      this.addadminloader.getAllAdmins=('getAllAdmins' in loading)?true:false;
      if(this.dIndex.status.use)
      {
        this.AdmininfoData[this.dIndex.status.row][this.dIndex.status.col].icon=('saveBlockAdmin' in loading)?'Loading':'Toggle';
      }
      if(this.dIndex.depositAccess.use)
      {
        this.AdmininfoData[this.dIndex.depositAccess.row][this.dIndex.depositAccess.col].icon=('saveDepositAccess' in loading)?'Loading':'Toggle';
      }
      if(this.dIndex.IMPSAccess.use)
      {
        this.AdmininfoData[this.dIndex.IMPSAccess.row][this.dIndex.IMPSAccess.col].icon=('saveIMPSAccess' in loading)?'Loading':'Toggle';
      }
      if(this.dIndex.roleChange.use)
      {
        this.AdmininfoData[this.dIndex.roleChange.row][this.dIndex.roleChange.col].loader=('saveRoleChange' in loading)?true:false;
      }
    });
    this.getAllData();
    console.log(this.userid);
  }
  getAllData()
  {
    this.apiservice.getRequest(config['getAdminRoles'],'getAdminRoles').subscribe((data: any) => {
      this.RolesList = data;
      this.RolesList.forEach(({Id, RoleName}) => {
        if (this.dynamicControls[3] && this.dynamicControls[3].options) {
          this.dynamicControls[3].options.push({ val: Id, op: RoleName });
        }
      });
      this.GetAllAdmins();
    }, (error) => {
      console.log(error);
    });
  }
  initializeData(){
    this.AllAdmininfo=[];
    this.AdmininfoData=[];
    this.dIndex={status:{row:0,col:0,use:false},depositAccess:{row:0,col:0,use:false},IMPSAccess:{row:0,col:0,use:false},roleChange:{row:0,col:0,use:false}};
  }
  GetAllAdmins()
  {
    this.initializeData();
    this.apiservice.sendRequest(config['getAllAdmins'], this.currentQuery, 'getAllAdmins').subscribe((data: any) => {
      this.AllAdmininfo=data;
      if(this.AllAdmininfo[0]){
        this.AdminDataCollumns=this.AdminCollumnHeaders;
        this.AllAdmininfo.forEach((element:any,index:any) => {
          this.AdmininfoData.push([
            {value:index+1,bg:'white-cell'},
            {bg:'white-cell',icon:"Multi",value:[
              {value:element.FName?(element.FName+' '+(element.LName?element.LName:'')):'',bg:'white-cell'},
              {brLine:true},
              {value:element.Id<10?this.siteCode+'00'+element.Id:element.Id<100?this.siteCode+'0'+element.Id:this.siteCode+element.Id,bg:'white-cell'},

            ]},
            {value:element.Gender,bg:'white-cell'},
            {value:element.Mobile,bg:'white-cell'},
            {value:element.Email,bg:'white-cell'},
            ...(this.userid.RoleCode == 'SA' ?[{value:'RoleName',bg:'white-cell',refArray:this.RolesList,sKey:'Id',sValue:element.RoleId,icon:'EditDropdown',loader:false}]:[{value:element.RoleName,bg:'white-cell',refArray:this.RolesList,sKey:'Id',sValue:element.RoleId}]),
            {bg:'white-cell',icon:"Multi",value:[
              {value:"Total Deposit: "+element.TotalDeposit,bg:'white-cell'},
              {brLine:true},
              {value:"Total Withdraw : "+element.TotalWithdrawal,bg:'white-cell'},

            ]},
            {value:element.TotalProfit,bg:'white-cell'},
            ...(this.userid.RoleCode == 'SA' ?[{value:element.Status,bg:'white-cell',icon:'Toggle'}]:[{value:'',bg:'white-cell'}]),
            ...(this.userid.RoleCode == 'SA' ?[{value:element.DepositAccess,bg:'white-cell',icon:'Toggle'}]:[{value:'',bg:'white-cell'}]),
            ...(element.DepositAccess && this.userid.RoleCode == 'SA'?[{value:element.IMPSAccess,bg:'white-cell',icon:'Toggle'}]:[{value:'',bg:'white-cell'}]),
            {value:'',bg:'white-cell',icon:'View'}
          ])
        });
      }
      else{
        this.AdminDataCollumns=this.utilities.TableDataNone;
      }
    }, (error) => {
      console.log(error);
    });
  }
  getSearchQuery(formVal:any)
  {
    this.currentQuery.Type=formVal.Type.value;
    this.currentQuery.intParam1=formVal.status.value;
    this.currentQuery.intParam2=formVal.role.value;
    this.currentQuery.Search=formVal.Search.value?formVal.Search.value:"";
    this.currentQuery.StartDateTime = moment(formVal.StartDateTime.value).format('YYYY-MM-DD HH:mm:ss');

    this.GetAllAdmins();
  }
  onValueChange(formVal:any)
  {
    let adminData = this.AllAdmininfo[formVal.row];
    if(formVal.col==5){
      this.dIndex.roleChange.row=formVal.row;
      this.dIndex.roleChange.col=formVal.col;
      this.dIndex.roleChange.use=true;
      let param = '?Id='+ adminData.Id +'&newRoleId='+formVal.value;
      this.saveRoleAdmin(param);
    }
    else if(formVal.col==8){
      this.dIndex.status.row=formVal.row;
      this.dIndex.status.col=formVal.col;
      this.dIndex.status.use=true;
      let param = '?Id='+ adminData.Id;
      this.saveStatusAdmin(param);
    }
    else if(formVal.col==9){
      this.dIndex.depositAccess.row=formVal.row;
      this.dIndex.depositAccess.col=formVal.col;
      this.dIndex.depositAccess.use=true;
      let param = '?Id='+ adminData.Id;
      this.saveDepositAccessAdmin(param);
    }
    else if(formVal.col==10){
      this.dIndex.IMPSAccess.row=formVal.row;
      this.dIndex.IMPSAccess.col=formVal.col;
      this.dIndex.IMPSAccess.use=true;
      let param = '?Id='+ adminData.Id;
      this.saveIMPSAccessAdmin(param);
    }
    if(formVal.type=='View'){
      // window.open('/users/adminview/'+this.AllAdmininfo[formVal.row].Id, '__blank');
      const data = JSON.stringify(this.AllAdmininfo[formVal.row]);
      const encodedData = btoa(data);
      window.open(`/users/adminview?data=${encodedData}`, '');
    }
  }
  saveRoleAdmin(param:any)
  {
    this.apiservice.getRequest(config['saveRoleChange'] + param,'saveRoleChange').subscribe((data: any) => {
      if (data) {
        if (data.ErrorCode == 1) {
          this.utilities.toastMsg('success',"Success", data.ErrorMessage);
          this.GetAllAdmins();
        } else {
          this.utilities.toastMsg('error',"Failed",data.ErrorMessage);
        }
      }
    }, (error) => {
      console.log(error);
    });
  }
  saveStatusAdmin(param:any){
    this.apiservice.getRequest(config['saveBlockAdmin'] + param,'saveBlockAdmin').subscribe((data: any) => {
      if (data) {
        if (data.ErrorCode == 1) {
          this.utilities.toastMsg('success',"Success", data.ErrorMessage);
          this.AdmininfoData[this.dIndex.status.row][this.dIndex.status.col].value=!this.AdmininfoData[this.dIndex.status.row][this.dIndex.status.col].value;
        } else {
          this.utilities.toastMsg('error',"Failed",data.ErrorMessage);
        }
      }
    }, (error) => {
      console.log(error);
    });
  }
  saveDepositAccessAdmin(param:any){
    this.apiservice.getRequest(config['saveDepositAccess'] + param,'saveDepositAccess').subscribe((data: any) => {
      if (data) {
        if (data.ErrorCode == 1) {
          this.utilities.toastMsg('success',"Success", data.ErrorMessage);
          this.AdmininfoData[this.dIndex.depositAccess.row][this.dIndex.depositAccess.col].value=!this.AdmininfoData[this.dIndex.depositAccess.row][this.dIndex.depositAccess.col].value;
          console.log(this.AdmininfoData[this.dIndex.depositAccess.row][this.dIndex.depositAccess.col].value);
          if(!this.AdmininfoData[this.dIndex.depositAccess.row][this.dIndex.depositAccess.col].value){
            this.AdmininfoData[this.dIndex.depositAccess.row][this.dIndex.depositAccess.col+1] = {value:'',bg:'white-cell'};
          }
          else{
            this.AdmininfoData[this.dIndex.depositAccess.row][this.dIndex.depositAccess.col+1] = {value:0,bg:'white-cell',icon:'Toggle'};
          }
        } else {
          this.utilities.toastMsg('error',"Failed",data.ErrorMessage);
        }
      }
    }, (error) => {
      console.log(error);
    });
  }
  saveIMPSAccessAdmin(param:any){
    this.apiservice.getRequest(config['saveIMPSAccess'] + param,'saveIMPSAccess').subscribe((data: any) => {
      if (data) {
        if (data.ErrorCode == 1) {
          this.utilities.toastMsg('success',"Success", data.ErrorMessage);
          this.AdmininfoData[this.dIndex.IMPSAccess.row][this.dIndex.IMPSAccess.col].value=!this.AdmininfoData[this.dIndex.IMPSAccess.row][this.dIndex.IMPSAccess.col].value;
        } else {
          this.utilities.toastMsg('error',"Failed",data.ErrorMessage);
        }
      }
    }, (error) => {
      console.log(error);
    });
  }
  AddAdminOpenPopup() {
    let dialogRef = this.dialog.open(this.AddAdminDialogOpen, {
      width: '800px',
      panelClass: 'screen-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {})
  }
  
  closePopup(){
    this.dialog.closeAll();
  }
}