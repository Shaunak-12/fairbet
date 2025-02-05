import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormsModule, FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { AdvanceInputsNewComponent } from '../advance-inputs-new/advance-inputs-new.component';
import { FeatherModule } from 'angular-feather';


@Component({
  selector: 'app-advance-title-head-new',
  imports: [
    AdvanceInputsNewComponent, MatProgressSpinnerModule, CommonModule,
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
  templateUrl: './advance-title-head-new.component.html',
  styleUrl: './advance-title-head-new.component.scss'
})
export class AdvanceTitleHeadNewComponent implements OnInit {
  @Input() subText: boolean = false;
  @Input() titleText: string = '';
  @Input() btnVal: string = '';
  @Input() classes: string = '';
  @Input() dynamicForm: any = [];
  @Input() showForm: any = false;
  @Output() onSubmitForm = new EventEmitter<any>();
  // generatedForm!: FormGroup;

  generatedForm: FormGroup = new FormGroup({}); // Your form initialization

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.generatedForm = this.toFormGroup(this.dynamicForm);
  }

   // added by shaunak -- Type guard to ensure the control is a FormGroup
   getFormGroup(control: AbstractControl | null): FormGroup {
    if (control instanceof FormGroup) {
      return control;
    }
    throw new Error(`Control is not a FormGroup: ${control}`);
  }
  
  toFormGroup(questions: any[]): FormGroup {
    const group: any = {};
    questions.forEach(question => {
      if (question.subque.length > 0) {
        if (question.type == 'input') {
          group[question.que] = this.formBuilder.group({
            value: [null],
            subque: this.toFormArray(question.subque)
          });
        }
        else if (question.type == 'dropdown') {
          group[question.que] = this.formBuilder.group({
            value: [question.default ? question.default : question.options[0].val],
            subque: this.toFormArray(question.subque)
          });
        }
        else if (question.type == 'daterange') {
          group[question.que] = this.formBuilder.group({
            value1: [question.startDate],
            value2: [question.endDate],
            subque: this.toFormArray(question.subque)
          });
        }
        else if (question.type == 'date') {
          group[question.que] = this.formBuilder.group({
            value: [question.defaultDate],
            subque: this.toFormArray(question.subque)
          });
        }
      } else {
        if (question.type == 'input') {
          group[question.que] = this.formBuilder.group({
            value: [null]
          });
        }
        else if (question.type == 'dropdown') {
          group[question.que] = this.formBuilder.group({
            value: [question.default ? question.default : question.options[0].val]
          });
        }
        else if (question.type == 'daterange') {
          group[question.que] = this.formBuilder.group({
            value1: [question.startDate],
            value2: [question.endDate],
          });
        }
        else if (question.type == 'date') {
          group[question.que] = this.formBuilder.group({
            value: [question.defaultDate]
          });
        }
      }
    });
    return this.formBuilder.group(group);
  }

  toFormArray(subQuestions: any[]): FormArray {
    const arr: FormGroup[] = [];
    subQuestions.forEach(subQuestion => {
      let group: FormGroup = this.formBuilder.group({});
      if (subQuestion.subque.length > 0) {
        if (subQuestion.type == 'input') {
          group = this.formBuilder.group({
            value: [null],
            subque: this.toFormArray(subQuestion.subque)
          });
        }
        else if (subQuestion.type == 'dropdown') {
          group = this.formBuilder.group({
            value: [subQuestion.default ? subQuestion.default : subQuestion.options[0].val],
            subque: this.toFormArray(subQuestion.subque)
          });
        }
        else if (subQuestion.type == 'daterange') {
          group = this.formBuilder.group({
            value1: [subQuestion.startDate],
            value2: [subQuestion.endDate],
            subque: this.toFormArray(subQuestion.subque)
          });
        }
        else if (subQuestion.type == 'date') {
          group = this.formBuilder.group({
            value: [subQuestion.defaultDate],
            subque: this.toFormArray(subQuestion.subque)
          });
        }
      } else {
        if (subQuestion.type == 'input') {
          group = this.formBuilder.group({
            value: [null]
          });
        }
        else if (subQuestion.type == 'dropdown') {
          group = this.formBuilder.group({
            value: [subQuestion.default ? subQuestion.default : subQuestion.options[0].val]
          });
        }
        else if (subQuestion.type == 'daterange') {
          group = this.formBuilder.group({
            value1: [subQuestion.startDate],
            value2: [subQuestion.endDate]
          });
        }
        else if (subQuestion.type == 'date') {
          group = this.formBuilder.group({
            value: [subQuestion.defaultDate]
          });
        }
      }
      arr.push(group);
    });
    return this.formBuilder.array(arr);
  }

  submitFunction() {
    this.onSubmitForm.emit(this.generatedForm.getRawValue());
  }
}