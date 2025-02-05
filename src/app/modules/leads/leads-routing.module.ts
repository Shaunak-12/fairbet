import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallLeadComponent } from './call-lead/call-lead.component';
import { BulkLeadComponent } from './bulk-lead/bulk-lead.component';
import { CallDetailsComponent } from './call-details/call-details.component';

const routes: Routes = [
    {
      path: 'myleads',
      component: CallLeadComponent
    },
    {
      path: 'bulklead',
      component: BulkLeadComponent
    },
    {
      path: 'calldetails',
      component: CallDetailsComponent
    }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
