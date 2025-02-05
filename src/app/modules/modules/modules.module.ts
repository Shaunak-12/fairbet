import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { UsersModule } from '@modules/users/users.module';
import { BankModule } from '@modules/bank/bank.module';
import { TitleHeaderComponent } from '@shared/title-header/title-header.component';
import { CardListComponent } from '@shared/card-list/card-list.component';
import { MultiInputHeaderComponent } from '@shared/multi-input-header/multi-input-header.component';
import { AdvanceTableComponent } from '@shared/advance-table/advance-table.component';
import { AdvanceTablePaginatorComponent } from '@shared/advance-table-paginator/advance-table-paginator.component';
import { CurrencySymbolPipe } from '@shared/currency-symbol.pipe';
import { AdvanceFormTableComponent } from '@shared/advance-form-table/advance-form-table.component';
import { EditDropdownComponent } from '@shared/edit-dropdown/edit-dropdown.component';
import { EditTextareaComponent } from '@shared/edit-textarea/edit-textarea.component';
import { TopDatanavComponent } from '@shared/top-datanav/top-datanav.component';
import { AdvanceTitleHeadNewComponent } from '@shared/advance-title-head-new/advance-title-head-new.component';
import { AdvanceInputsNewComponent } from '@shared/advance-inputs-new/advance-inputs-new.component';
import { DynaTableComponent } from '@shared/dyna-table/dyna-table.component';
import { ButtonGridComponent } from '@shared/button-grid/button-grid.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [],
 
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
    MatAccordion,
    MatExpansionModule,
    MatProgressBarModule,
    MatRippleModule,

    // DashboardModule,
    // UsersModule,
    // BankModule,
    

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
    MatAccordion,
    MatExpansionModule,
    MatProgressBarModule,
    FeatherModule,
    MatRippleModule,

    // DashboardModule,
    // UsersModule,
    // BankModule,

  ]
})
export class ModulesModule { }
