import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Validators,FormControl,FormsModule,FormBuilder, FormGroup, FormArray} from '@angular/forms';
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


@Component({
  selector: 'app-advance-table-paginator',
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
          // FeatherModule.pick(allIcons),
          MatCheckboxModule,
          MatExpansionModule,
          MatProgressBarModule
  ],
  templateUrl: './advance-table-paginator.component.html',
  styleUrl: './advance-table-paginator.component.scss'
})
export class AdvanceTablePaginatorComponent implements OnInit {
  @Input() pageNo:number=1;
  @Input() posn:string='';
  @Input() pagesTotal:number=1;
  @Input() rowCount:any={};
  @Input() pageCount:any[]=[];
  @Input() paginatorBlock:any[]=[];
  @Input() selectedPageCount:number=1;
  @Input() DataLoader:boolean=false;
  
  @Output() onPaginatorChange = new EventEmitter<any>();
  
  UserPageCount=1;
  
  inputPageBox = new FormControl('',Validators.required);
  constructor() { }
  
  ngOnInit(): void {
    this.UserPageCount=this.selectedPageCount;
  }
  
  buttonPressed(value:any){
    this.inputPageBox.setValue('1');
    this.onPaginatorChange.emit({'action':'pageSize','pageSize':value});
  }
  
  countPressed(){
    this.onPaginatorChange.emit({'action':'pageNo','pageNo':this.inputPageBox.getRawValue()});
  }

  pagerPressed(pageval:any){
    if(pageval!=this.pageNo)
    this.onPaginatorChange.emit({'action':'pageNo','pageNo':pageval});
  }

  pnPressed(val:number){
    if(val==1){
      if(this.pageNo!=1)
      this.onPaginatorChange.emit({'action':'pageNo','pageNo':this.pageNo-1});
    }
    else{
      if(this.pageNo!=this.pagesTotal)
      this.onPaginatorChange.emit({'action':'pageNo','pageNo':this.pageNo+1});
    }
  }
  
}
