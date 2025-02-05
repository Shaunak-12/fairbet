import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatorRoutingModule } from './creator-routing.module';

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

import { PagesComponent } from './pages/pages.component';
import { ReelsComponent } from './reels/reels.component';
import { DcPromotionComponent } from './dc-promotion/dc-promotion.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { DcpaystatementComponent } from './dcpaystatement/dcpaystatement.component';
import { StatusPageComponent } from './pages/status-page/status-page.component';
import { AddStatementComponent } from './dcpaystatement/add-statement/add-statement.component';
import { AddReelComponent } from './reels/add-reel/add-reel.component';
import { ReelHistoryComponent } from './reel-history/reel-history.component';
import { ApproveReelComponent } from './reels/approve-reel/approve-reel.component';


@NgModule({
//   declarations: [
//     PagesComponent,
//     ReelsComponent,
//     DcPromotionComponent,
//     AddPageComponent,
//     DcpaystatementComponent,
//     StatusPageComponent,
//     AddStatementComponent,
//     AddReelComponent,
//     ReelHistoryComponent,
//     ApproveReelComponent
//   ],
  imports: [
    CommonModule,
    CreatorRoutingModule,
    SharedModule,
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
    FeatherModule.pick(allIcons)
  ]
})
export class CreatorModule { }
