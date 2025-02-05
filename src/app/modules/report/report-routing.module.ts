import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterListComponent } from './register-list/register-list.component';
import { UserDepositListComponent } from './user-deposit-list/user-deposit-list.component';
import { UserBonusComponent } from './user-bonus/user-bonus.component';
import { NewRegisterListComponent } from './new-register-list/new-register-list.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'registerlist',
    pathMatch: 'full'
  },
  {
    path: 'registerlist',
    component: NewRegisterListComponent
  },
  // {
  //   path: 'registerlist',
  //   component: RegisterListComponent
  // },
  {
    path: 'userdeposit',
    component: UserDepositListComponent
  },
  {
    path: 'userbonus',
    component: UserBonusComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReportRoutingModule { }