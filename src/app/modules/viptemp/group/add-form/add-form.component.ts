import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { ModulesModule } from '@modules/modules/modules.module';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import moment from 'moment';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-add-form',
  imports: [
    ModulesModule
    // SharedModule,
    
    // CommonModule,
    // ReactiveFormsModule,
    // MatTableModule,
    // MatFormFieldModule,
    // MatSnackBarModule,
    // MatIconModule,
    // FormsModule,
    // MatButtonModule,
    // MatDatepickerModule,
    // MatInputModule,
    // MatNativeDateModule,
    // MatTabsModule,
    // MatDialogModule,
    // MatRadioModule,
    // MatSelectModule,
    // MatPaginatorModule,
    // MatProgressSpinnerModule,
    // MatSlideToggleModule,
    // FeatherModule,
    // MatCheckboxModule,
    // // MatAccordion,
    // MatExpansionModule,
    // MatProgressBarModule,
    // MatRippleModule,
  ],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss'
})
export class AddFormComponent implements OnInit {
  @Input() submitBtn!:boolean;
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  
  submitDisabled=false;
  
  resetBtn = true;
  addForm!: FormGroup;
  adminPass = '';
  userWals:any=[];

  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }

  ngOnInit(){
    this.userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
    console.log(this.userWals);
    this.initializeForm();
  }
  
  initializeForm(){
    this.addForm = this.formBuilder.group({
      Name: ["", [Validators.required]],
      WalletTypeId: [parseInt(sessionStorage.getItem('WalChosen')||'{}')],
      SiteCode: [sessionStorage.getItem('selectedSite')]
      });
      console.log(this.addForm.getRawValue());
  }
  
  onBack(){
    this.onCancel.emit();
  }
  
  onSubmit(){
    if(this.addForm.invalid){
      this.utilities.toastMsg('warning','Please enter Required Data!','');
    }
    else{
      this.submitDisabled=true;
      let FormValue = this.addForm.getRawValue();
      if(!FormValue.id){
        delete FormValue.id;
        this.apiservice.sendRequest(config['newGrpMst'],FormValue,"newGrpMst").subscribe((data: any) => {
          this.submitDisabled=false;
          if (data.ErrorCode === "1") {
            this.utilities.toastMsg('success',"Success", data.ErrorMessage);
            this.adminPass=data.ErrorMessage;
            this.addForm.disable();
            this.onCancel.emit();
          }
          else {
            this.utilities.toastMsg('warning',"Failed",data.Result + " : " + data.ErrorMessage);
          }
          this.onSave.emit();
        }, (error:any) => {
          console.log(error);
        });
      }
    }
  }
}