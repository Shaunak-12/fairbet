import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Validators, FormControl, FormsModule, FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';
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
import { FeatherModule } from 'angular-feather';
import { EditDropdownComponent } from '@shared/edit-dropdown/edit-dropdown.component';
import { EditTextareaComponent } from '@shared/edit-textarea/edit-textarea.component';

@Component({
  selector: 'app-dyna-table',
  imports: [
    EditDropdownComponent,EditTextareaComponent,
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
  templateUrl: './dyna-table.component.html',
  styleUrl: './dyna-table.component.scss'
})
export class DynaTableComponent implements OnInit {
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
    let inputValue = {'row':row,'col':cell,'value':event.checked,'type':'Toggle',data:this.TableData[row].rData};
    this.onInputChange.emit(inputValue);
  }

  setCheckChange(row:number,cell:number,type:any){
    let inputValue = {'row':row,'col':cell,'type':type,data:this.TableData[row].rData};
    this.onInputChange.emit(inputValue);
  }
  
  buttonPressed(row:number,cell:number,type:string){
    let inputValue = {'row':row,'col':cell,'type':type,data:this.TableData[row].rData};
    this.onInputChange.emit(inputValue);
  }

  externalCellAction(row:number,cell:number,formVal:any,type:string){
    let inputValue = {'row':row,'col':cell,'value':formVal,'type':type,data:this.TableData[row].rData};
    this.onInputChange.emit(inputValue);
  }

  buttonHeaderPressed(row:number,cell:number,type:string){
    let inputValue = {'row':row,'col':cell,'type':type,data:this.TableData[row].rData};
    this.onHeaderInputChange.emit(inputValue);
  }

  checkHeaderChanged(row:number,cell:number,type:any){
    let inputValue = {'row':row,'col':cell,'type':type,data:this.TableData[row].rData};
    this.onHeaderInputChange.emit(inputValue);
  }
  
}