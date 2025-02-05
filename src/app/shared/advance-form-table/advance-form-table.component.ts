import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { FormControl,FormBuilder,FormGroup,FormsModule} from '@angular/forms';
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
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-advance-form-table',
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
  templateUrl: './advance-form-table.component.html',
  styleUrl: './advance-form-table.component.scss'
})
export class AdvanceFormTableComponent implements OnInit {
  @Input() TableCollumnData:any[]=[];
  @Input() TableData:any[]=[];
  @Input() DataLoader:boolean=false;
  @Input() dynamicForm:any = [];
  @Output() onInputChange = new EventEmitter<any>();
  @Output() onHeaderInputChange = new EventEmitter<any>();
  
  dateValues: Date[] = [];
  showForm = false;
  generatedForm!:FormGroup;
  constructor(private formBuilder:FormBuilder) { }
  
  ngOnInit(): void {
    this.generatedForm=this.formBuilder.group({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.dynamicForm[0]){
      this.initForm();
    }
  }

  initForm(){
    this.generatedForm = this.formBuilder.group([]);
    this.dynamicForm.forEach((element:any,index:number) => {
      if(element.type!='cell'&&element.type!='button'){
        if(element.type=='date'){
          this.generatedForm.addControl('C'+index, new FormControl(element.default?element.default.value:moment().toDate()));    
        }
        else{
          this.generatedForm.addControl('C'+index, new FormControl(element.default?element.default.value:''));
        }
      }
    });
    this.showForm = true;
  }
  
  setToggleChange(row:number,cell:number,event:MatSlideToggleChange){
    let inputValue = {'row':row,'col':cell,'value':event.checked,'type':'Toggle'};
    this.onInputChange.emit(inputValue);
  }
  
  setCheckChange(row:number,cell:number,type:any){
    let inputValue = {'row':row,'col':cell,'type':type};
    this.onInputChange.emit(inputValue);
  }
  
  buttonPressed(row:number,cell:number,type:string){
    let inputValue = {'row':row,'col':cell,'type':type};
    this.onInputChange.emit(inputValue);
  }

  FormButtonPressed(cell:number,type:any){
    let inputValue = {'col':cell,'type':type,'formVal':this.generatedForm.getRawValue()};
    this.onInputChange.emit(inputValue);
  }
  
  buttonHeaderPressed(row:number,cell:number,type:string){
    let inputValue = {'row':row,'col':cell,'type':type};
    this.onHeaderInputChange.emit(inputValue);
  }
  
  checkHeaderChanged(row:number,cell:number,type:any){
    let inputValue = {'row':row,'col':cell,'type':type};
    this.onHeaderInputChange.emit(inputValue);
  }
}
