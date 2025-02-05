import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonFunctionService } from '@services/common-function.service';
import {FormControl,FormsModule,FormBuilder, FormGroup, FormArray, AbstractControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-edit-dropdown',
  imports: [
    MatProgressSpinnerModule,CommonModule,
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
        MatSlideToggleModule,
        FeatherModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatProgressBarModule
  ],
  templateUrl: './edit-dropdown.component.html',
  styleUrl: './edit-dropdown.component.scss'
})
export class EditDropdownComponent implements OnInit {
  @Input()
  inputArray!: any[];
  @Input() searchKey:any;
  @Input() searchValue:any;
  @Input() returnKey:any;
  @Input() saveLoader:any;
  @Output() onOptionSave = new EventEmitter<any>();

  userVal = new FormControl();
  opVisible = false;
  valSelect = '';

  constructor(private utilities:CommonFunctionService) { }

  ngOnInit(): void {
    this.valSelect = this.utilities.getValueByKey(this.inputArray, this.searchKey, this.searchValue, this.returnKey);
    this.setControl();
  }

  setControl(){
    if(typeof this.inputArray[0][this.searchKey]=='string'){
      this.userVal.setValue(this.searchValue+'');
    }
    else{
      this.userVal.setValue(this.searchValue);
    }
  }

  switchSelect(): void {
    this.opVisible = !this.opVisible;
    if(!this.opVisible){
      this.setControl();
    }
  }

  saveSelect(){
    let formVal = this.userVal.getRawValue();
    console.log(formVal);
    if((typeof this.searchValue=='string')&&!(typeof formVal=='string'))
    {
      formVal = formVal+'';
    }
    else if ((typeof this.searchValue=='number')&&!(typeof formVal=='number'))
    {
      formVal = Number(formVal);
    }
    this.onOptionSave.emit(formVal);
  }

}