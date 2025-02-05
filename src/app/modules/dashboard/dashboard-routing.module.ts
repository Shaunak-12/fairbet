import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: MyDashboardComponent
  },
  {
    path: 'analytics',
    component: AnalyticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
