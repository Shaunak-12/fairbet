import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepositpromoComponent } from './depositpromo/depositpromo.component';
import { ClaimbonusComponent } from './claimbonus/claimbonus.component';
import { SpinwheelComponent } from './spinwheel/spinwheel.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'depositpromo',
    pathMatch: 'full'
  },
  {
    path: 'depositpromo',
    component: DepositpromoComponent
  },
  {
    path: 'scratchcard',
    component: ClaimbonusComponent
  },
  {
    path: 'spinwheel',
    component: SpinwheelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoRoutingModule { }
