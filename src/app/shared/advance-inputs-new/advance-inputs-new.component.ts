import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_RIPPLE_GLOBAL_OPTIONS, MatRippleModule } from '@angular/material/core';
// import _moment, { Moment } from 'moment';
import { FormControl,FormsModule,FormBuilder,FormGroup, FormArray } from '@angular/forms';
// import {MatDatepicker} from '@angular/material/datepicker';
import _moment , {default as _rollupMoment} from 'moment';

import { ReactiveFormsModule} from '@angular/forms';
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
  selector: 'app-advance-inputs-new',
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
          MatProgressBarModule,
          MatRippleModule
  ],
  templateUrl: './advance-inputs-new.component.html',
  styleUrl: './advance-inputs-new.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class AdvanceInputsNewComponent {
  @Input() question: any;
  @Input() formGroup!: FormGroup;
  @Output() submitTrigger = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
      if(this.question.changeAction && this.question.changeAction=='submit'){
        if(this.question.type!='daterange'){
          this.formGroup.get('value')?.valueChanges.subscribe((val) => {
            this.submitTrigger.emit();
          })
        }
        else if(this.question.type=='daterange'){
          this.formGroup.get('value1')?.valueChanges.subscribe((val) => {
            this.submitTrigger.emit();
          })
          this.formGroup.get('value2')?.valueChanges.subscribe((val) => {
            this.submitTrigger.emit();
          })
        }
      }
  }

  get subqueArray(): FormArray {
    return this.formGroup.get('subque') as FormArray;
  }

  // Cast each control in the FormArray to FormGroup
  getSubGroupControl(index: number): FormGroup {
    return this.subqueArray.at(index) as FormGroup;
  }
}
