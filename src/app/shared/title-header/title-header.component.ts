import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { SharedModule } from '@shared/shared.module';



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
import { MatExpansionModule } from '@angular/material/expansion';


import _moment from 'moment';

import {default as _rollupMoment, Moment} from 'moment';
import { CommonModule } from '@angular/common';

const moment = _rollupMoment || _moment;

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
  selector: 'app-title-header',
  imports: [
    // SharedModule
    CommonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatIconModule,
        FormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatTabsModule,
        MatDialogModule,
        MatRadioModule,
        MatSelectModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        FeatherModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatProgressBarModule,
        MatRippleModule
    
  ],
  templateUrl: './title-header.component.html',
  styleUrl: './title-header.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class TitleHeaderComponent implements OnInit {
  
  @Input() titleText:string ='';
  @Input() subText:boolean=false;
  @Input() showWallets:boolean=true;
  @Input() classes:string ='';
  @Input() searchType:string ='';
  @Input() DateObj:any={};
  @Input() searchOptions:any=[];
  @Input() maxDate!: Date;
  @Input() exportLoader!: boolean | false;
  @Input() searchHasOption!: boolean | false;
  @Input() searchButton!: boolean;
  @Input() startEndDates: Date[] = [];
  @Input() searchHasInputOption!: boolean | false;
  @Input() searchHasInputOption1!: boolean | false;
  @Input() showExport!: boolean | false;
  
  @Output() onSearch = new EventEmitter<any>();
  @Output() onExport = new EventEmitter<any>();
  
  inputOptionSelected = new FormControl('');
  inputSearchBox = new FormControl('');
  inputSearchBox1 = new FormControl('');
  
  newMonthSelected = new FormControl(moment().startOf('month'));
  newYearSelected = new FormControl(moment().startOf('year'));
  
  dateValues: Date[] = [];
  DateType=[{name:'Daily',value:'D'},{name:'Monthly',value:'M'},{name:'Yearly',value:'Y'}];
  
  userWals:any=[];
  SelectedSiteWal=new FormControl();
  
  constructor() { }
  
  ngOnInit(): void {
    this.dateValues=this.startEndDates;
    if(this.searchOptions.length>0){
      this.inputOptionSelected.setValue(this.searchOptions[0].value);
    }
    if(this.searchType=='customSearch'){
      this.inputOptionSelected.valueChanges.subscribe((value) => {
        this.searchCustomFunction();
        // this.submitFunction();
      })
    }
    
    this.userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
    this.SelectedSiteWal.setValue(sessionStorage.getItem('WalChosen'));
    if(this.showWallets && this.searchType=='customSearch'){
      this.SelectedSiteWal.valueChanges.subscribe((value) => {
        sessionStorage.setItem('WalChosen',value);
        this.searchCustomFunction();
      })
    }
    else if(this.showWallets){
      this.SelectedSiteWal.valueChanges.subscribe((value) => {
            sessionStorage.setItem('WalChosen',value);
        this.searchFunction();
      })
    }
  }
  
  searchFunction(){
    let searchQuery:any = this.dateValues;
    if(this.searchHasOption && this.searchOptions.length!=0){
      searchQuery = {Dates:this.dateValues,Option:this.inputOptionSelected.getRawValue(),wallet:this.SelectedSiteWal.getRawValue()}
    }
    if(this.searchHasInputOption){
      searchQuery = {Dates:this.dateValues,searchInput:this.inputSearchBox.getRawValue(),wallet:this.SelectedSiteWal.getRawValue()}
    }
    if(this.searchHasInputOption1){
      searchQuery = {Dates:this.dateValues,playerInput:this.inputSearchBox1.getRawValue(),wallet:this.SelectedSiteWal.getRawValue()}
    }
    this.onSearch.emit(searchQuery);
  }
  
  searchCustomFunction(){
    let searchQuery:any = this.dateValues;
    if(this.searchHasOption && this.searchOptions.length!=0){
      searchQuery = {Dates:this.dateValues,Option:this.inputOptionSelected.getRawValue(),wallet:this.SelectedSiteWal.getRawValue()}
    }
    if(this.searchHasInputOption){
      searchQuery = {...searchQuery,searchInput:this.inputSearchBox.getRawValue(),wallet:this.SelectedSiteWal.getRawValue()}
    }
    if(this.searchHasInputOption1){
      searchQuery = {...searchQuery,playerInput:this.inputSearchBox1.getRawValue(),wallet:this.SelectedSiteWal.getRawValue()}
    }
    this.onSearch.emit(searchQuery);
  }
  
  exportPressed(){
    this.onExport.emit();
  }
  
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.newMonthSelected.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.newMonthSelected.setValue(ctrlValue);
    datepicker.close();
  }
  
  setYear(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.newYearSelected.value!;
    ctrlValue.year(normalizedYear.year());
    this.newYearSelected.setValue(ctrlValue);
    datepicker.close();
  }
}