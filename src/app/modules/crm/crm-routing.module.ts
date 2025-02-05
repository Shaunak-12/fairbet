import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { MyIssueComponent } from './my-issue/my-issue.component';

const routes: Routes = [
  {
    path:'createissue',
    component:CreateIssueComponent,
  },
  {
    path:'getallcrmissue',
    component:MyIssueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }
