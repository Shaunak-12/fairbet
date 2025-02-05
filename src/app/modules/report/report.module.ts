import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from '@angular/forms';
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

import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

import { RegisterListComponent } from './register-list/register-list.component';
import { UserDepositListComponent } from './user-deposit-list/user-deposit-list.component';
import { UserBonusComponent } from './user-bonus/user-bonus.component';

@NgModule({
//   declarations: [
//     RegisterListComponent,
//     UserDepositListComponent,
//     UserBonusComponent
//   ],
  imports: [
    ReportRoutingModule,
    // SharedModule,
    
  ]
})
export class ReportModule { }
