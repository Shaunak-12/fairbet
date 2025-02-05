import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
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
  selector: 'app-create-user',
  imports: [
    ModulesModule
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class CreateUserComponent implements OnInit {
  todayDate = new Date();
  submitDisabled=false;
  adduser!: FormGroup;
  walList = JSON.parse(sessionStorage.getItem('WalList')||'{}');
  selWal = this.walList;
  TransactionTypeList = [
    {cc:'INR',cn:'INR'},
    {cc:'BDT',cn:'BDT'},
    {cc:'MYR',cn:'MYR'},
    {cc:'KZT',cn:'KZT'},
    {cc:'NPR',cn:'NPR'},
    {cc:'USD',cn:'USD'},
    {cc:'GBP',cn:'GBP (Pound)'},
    {cc:'IDR',cn:'IDR'},
    {cc:'SGD',cn:'SGD'}
  ];
  userPass='';
  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }
  
  ngOnInit(){
    this.initializeForm();
  }
  
  initializeForm(){
    this.adduser = this.formBuilder.group({
      UserName: ["", [Validators.required]],
      FName: ["", [Validators.required]],
      LName: ["", [Validators.required]],
      Mobile: ["", [Validators.required,Validators.pattern('^[0-9+]+$'),Validators.maxLength(11)]],
      DOB: ["", [Validators.required]],
      walletTypeId: [""],
      SiteCode: [sessionStorage.getItem('selectedSite')]
    });
  }
  
  onSubmit(){
    let walArr="";
    this.selWal.forEach((element: { selected: any; Id: string; }) => {
      if(element.selected){
        walArr=(walArr!=''?walArr+','+element.Id:element.Id);
      }
    });
    this.adduser.get('walletTypeId')?.setValue(walArr);
    if(this.adduser.invalid){
      this.utilities.toastMsg('warning','Please enter Required Data!','');
    }
    else{
      this.submitDisabled=true;
      let FormValue = this.adduser.getRawValue();
      this.apiservice.sendRequest(config['saveUserProfile'], FormValue,'saveUserProfile').subscribe((data: any) => {
        if (data) {
          if (data.ErrorCode == 1) {
            this.utilities.toastMsg('success',"Success", data.ErrorMessage);
            this.userPass = data.ErrorMessage;
            this.adduser.disable();
          } else {
            this.submitDisabled = false;
            this.utilities.toastMsg('error',"Failed",data.ErrorMessage);
          }
        }
      }, (error) => {
        console.log(error);
        this.submitDisabled = false;
      });
    }
  }
}