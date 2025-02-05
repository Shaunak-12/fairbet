import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
import { allIcons } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-card-list',
  imports: [
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
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit {

  @Input() cardData:any=[];
  @Input() DataLoader:boolean=false;
  @Output() onInputChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    
  }

  cardClicked(type:any,index:number){
    this.onInputChange.emit({type:type,id:index});
  }

}
