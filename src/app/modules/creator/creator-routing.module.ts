import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { ReelsComponent } from './reels/reels.component';
import { DcPromotionComponent } from './dc-promotion/dc-promotion.component';
import { DcpaystatementComponent } from './dcpaystatement/dcpaystatement.component';
import { ReelHistoryComponent } from './reel-history/reel-history.component';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'registerlist',
    pathMatch: 'full'
  },
  {
    path: 'pages',
    component: PagesComponent
  },
  {
    path: 'reels',
    component: ReelsComponent
  },
  {
    path: 'dcpaystatement',
    component: DcpaystatementComponent
  },
  {
    path: 'dcpromotion/:id/:extrabit/:pname',
    component: DcPromotionComponent
  },
  {
    path: 'reel-history/:id/:extrabit/:pname/:rname',
    component: ReelHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatorRoutingModule { }
