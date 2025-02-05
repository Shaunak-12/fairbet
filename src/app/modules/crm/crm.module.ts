import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmRoutingModule } from './crm-routing.module';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { MyIssueComponent } from './my-issue/my-issue.component';
import { SharedModule } from '@shared/shared.module';
import { AddCommentsComponent } from './add-comments/add-comments.component';

@NgModule({
//   declarations: [
//     CreateIssueComponent,
//     MyIssueComponent,
//     AddCommentsComponent
//   ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    SharedModule
  ]
})
export class CrmModule { }