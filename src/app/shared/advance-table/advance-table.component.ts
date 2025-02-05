import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FormControl, FormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
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
import { CommonModule } from '@angular/common';
import { EditDropdownComponent } from '../edit-dropdown/edit-dropdown.component';
import { EditTextareaComponent } from '../edit-textarea/edit-textarea.component';
import { FeatherModule } from 'angular-feather';


@Component({
  selector: 'app-advance-table',
  imports: [
    EditDropdownComponent,
    EditTextareaComponent,
    // MatSlideToggleChange,
    MatProgressSpinnerModule, CommonModule,
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
  templateUrl: './advance-table.component.html',
  styleUrl: './advance-table.component.scss'
})
export class AdvanceTableComponent implements OnInit {
  @Input() TableCollumnData:any[]=[];
  @Input() TableData:any[]=[];
  @Input() DataLoader:boolean=false;
  @Input() miniLoader:boolean=false;
  @Output() onInputChange = new EventEmitter<any>();
  @Output() onHeaderInputChange = new EventEmitter<any>();
  @Input() rowCount?:number=0;
  
  dateValues: Date[] = [];
  
  constructor() { }
  
  ngOnInit(): void {
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

  externalCellAction(row:number,cell:number,formVal:any,type:string){
    let inputValue = {'row':row,'col':cell,'value':formVal,'type':type};
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