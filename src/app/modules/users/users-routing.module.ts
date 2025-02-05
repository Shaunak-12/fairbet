import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateUserComponent } from './create-user/create-user.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { WithdrawalRequestComponent } from './withdrawal-request/withdrawal-request.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { CallRequestComponent } from './call-request/call-request.component';
import { EditplayerComponent } from './editplayer/editplayer.component';
import { SmsProviderComponent } from './sms-provider/sms-provider.component';
import { MultiLanguageComponent } from './multi-language/multi-language.component';
import { PlayerOtpComponent } from './player-otp/player-otp.component';
import { PlayerIssueComponent } from './player-issue/player-issue.component';
import { AdminDetailsComponent } from './add-admin/admin-details/admin-details.component';
import { AddAgentComponent } from './add-agent/add-agent.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'createuser',
    pathMatch: 'full'
  },
  {
    path: 'createuser',
    component: CreateUserComponent
  },
  {
    path: 'searchplayer',
    component: PlayerListComponent
  },
  {
    path: 'callrequest',
    component: CallRequestComponent
  },
  {
    path: 'playerdetailview/:id',
    component: PlayerDetailsComponent
  },
  {
    path: 'withdrawalrequest',
    component: WithdrawalRequestComponent
  },
  {
    path: 'alladmins',
    component: AddAdminComponent
  },
  {
    path: 'editplayer',
    component: EditplayerComponent
  },
  {
    path: 'smsserviceprovider',
    component: SmsProviderComponent
  },
  {
    path: 'multilanguage',
    component: MultiLanguageComponent
  },
  {
    path: 'playerotp',
    component: PlayerOtpComponent
  },
  {
    path: 'playerissue',
    component: PlayerIssueComponent
  },
  {
    path: 'adminview',
    component: AdminDetailsComponent
  },
  {
    path: 'getalladminagent',
    component: AddAgentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }