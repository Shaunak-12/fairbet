import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
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

import {MatProgressBarModule} from '@angular/material/progress-bar';

import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

import { TitleHeaderComponent } from './title-header/title-header.component';
import { CardListComponent } from './card-list/card-list.component';
import { MultiInputHeaderComponent } from './multi-input-header/multi-input-header.component';
import { AdvanceTableComponent } from './advance-table/advance-table.component';
import { AdvanceTablePaginatorComponent } from './advance-table-paginator/advance-table-paginator.component';
import { AdvanceFormTableComponent } from './advance-form-table/advance-form-table.component';
import { CurrencySymbolPipe } from './currency-symbol.pipe';
import { EditDropdownComponent } from './edit-dropdown/edit-dropdown.component';
import { EditTextareaComponent } from './edit-textarea/edit-textarea.component';
import { TopDatanavComponent } from './top-datanav/top-datanav.component';
import { AdvanceTitleHeadNewComponent } from './advance-title-head-new/advance-title-head-new.component';
import { AdvanceInputsNewComponent } from './advance-inputs-new/advance-inputs-new.component';
import { DynaTableComponent } from './dyna-table/dyna-table.component'
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { ButtonGridComponent } from './button-grid/button-grid.component';

@NgModule({
//   declarations: [
   
//   ],
  imports: [
    TitleHeaderComponent,
    CardListComponent,
    MultiInputHeaderComponent,
    AdvanceTableComponent,
    AdvanceTablePaginatorComponent,
    AdvanceFormTableComponent,
    CurrencySymbolPipe,
    EditDropdownComponent,
    EditTextareaComponent,
    TopDatanavComponent,
    AdvanceTitleHeadNewComponent,
    AdvanceInputsNewComponent,
    DynaTableComponent,
    ButtonGridComponent,


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
    FeatherModule.pick(allIcons),
    MatCheckboxModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatRippleModule

  ],
  exports: [
    TitleHeaderComponent,
    CardListComponent,
    MultiInputHeaderComponent,
    AdvanceTableComponent,
    AdvanceTablePaginatorComponent,
    AdvanceFormTableComponent,
    CurrencySymbolPipe,
    EditDropdownComponent,
    EditTextareaComponent,
    TopDatanavComponent,
    AdvanceTitleHeadNewComponent,
    AdvanceInputsNewComponent,
    DynaTableComponent,
    ButtonGridComponent,

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
    MatCheckboxModule,
    MatExpansionModule,
    FeatherModule,
    TitleHeaderComponent,
    CardListComponent,
    MultiInputHeaderComponent,
    AdvanceTableComponent,
    AdvanceTablePaginatorComponent,
    AdvanceFormTableComponent,
    CurrencySymbolPipe,
    TopDatanavComponent,
    AdvanceTitleHeadNewComponent,
    DynaTableComponent,
    MatProgressBarModule,
    MatRippleModule
  ]
})

export class SharedModule { }