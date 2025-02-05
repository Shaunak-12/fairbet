import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadsRoutingModule } from './leads-routing.module';
import { CallLeadComponent } from './call-lead/call-lead.component';
import { SharedModule } from '@shared/shared.module';
import { CompleteComponent } from './call-lead/complete/complete.component';
import { UpdateUserComponent } from './call-lead/update-user/update-user.component';
import { BulkLeadComponent } from './bulk-lead/bulk-lead.component';
import { CallingPopComponent } from './call-lead/calling-pop/calling-pop.component';
import { CallDetailsComponent } from './call-details/call-details.component';
import { SendConfirmComponent } from './call-lead/send-confirm/send-confirm.component';
import { ModulesModule } from '@modules/modules/modules.module';


@NgModule({
//   declarations: [
//     CallLeadComponent,
//     CompleteComponent,
//     UpdateUserComponent,
//     BulkLeadComponent,
//     CallingPopComponent,
//     CallDetailsComponent,
//     SendConfirmComponent
//   ],
  imports: [
    CommonModule,
    LeadsRoutingModule,
    SharedModule,
  ]
})
export class LeadsModule { }
