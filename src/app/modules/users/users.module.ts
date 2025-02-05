import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

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

import { CreateUserComponent } from './create-user/create-user.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { PlayerStatementComponent } from './player-statement/player-statement.component';
import { PlayerDepositComponent } from './player-deposit/player-deposit.component';
import { PlayerWithdrawComponent } from './player-withdraw/player-withdraw.component';
import { WithdrawalRequestComponent } from './withdrawal-request/withdrawal-request.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { ApproveDetailsComponent } from './approve-details/approve-details.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AddAdminDetailsComponent } from './add-admin-details/add-admin-details.component';
import { OnlineDepositWithdrawComponent } from './online-deposit-withdraw/online-deposit-withdraw.component';
import { BlockUserComponent } from './block-user/block-user.component';
import { CallRequestComponent } from './call-request/call-request.component';
import { CallRequestCompleteComponent } from './call-request-complete/call-request-complete.component';
import { PlayerCallLogComponent } from './player-call-log/player-call-log.component';
import { PlayerGamePlayedComponent } from './player-game-played/player-game-played.component';
import { PlayerOnlineDepositComponent } from './player-online-deposit/player-online-deposit.component';
import { EditplayerComponent } from './editplayer/editplayer.component';
import { EditplayerDetailsComponent } from './editplayer-details/editplayer-details.component';
import { ResetUserpasswordComponent } from './reset-userpassword/reset-userpassword.component';
import { SmsProviderComponent } from './sms-provider/sms-provider.component';
import { AddSmsComponent } from './sms-provider/add-sms/add-sms.component';
import { MultiLanguageComponent } from './multi-language/multi-language.component';
import { AddLanguageComponent } from './multi-language/add-language/add-language.component';
import { UpdateSmsComponent } from './sms-provider/update-sms/update-sms.component';
import { PlayerOtpComponent } from './player-otp/player-otp.component';
import { EditRolloveramountComponent } from './player-details/edit-rolloveramount/edit-rolloveramount.component';
import { ConversationComponent } from './player-details/conversation/conversation.component';
import { PlayerIssueComponent } from './player-issue/player-issue.component';
import { ChangeStatusComponent } from './player-issue/change-status/change-status.component';
import { PlayerDetailsIssueComponent } from './player-details-issue/player-details-issue.component';
import { AdminDetailsComponent } from './add-admin/admin-details/admin-details.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { StatusChangeComponent } from './add-agent/status-change/status-change.component';
import { ConfirmBoxComponent } from './call-request/confirm-box/confirm-box.component';
import { UserPromotionComponent } from './player-list/user-promotion/user-promotion.component';

@NgModule({
//   declarations: [
//     CreateUserComponent,
//     PlayerListComponent,
//     PlayerDetailsComponent,
//     PlayerStatementComponent,
//     PlayerDepositComponent,
//     PlayerWithdrawComponent,
//     WithdrawalRequestComponent,
//     BankDetailsComponent,
//     ApproveDetailsComponent,
//     AddAdminComponent,
//     AddAdminDetailsComponent,
//     OnlineDepositWithdrawComponent,
//     BlockUserComponent,
//     CallRequestComponent,
//     CallRequestCompleteComponent,
//     PlayerCallLogComponent,
//     PlayerGamePlayedComponent,
//     PlayerOnlineDepositComponent,
//     EditplayerComponent,
//     EditplayerDetailsComponent,
//     ResetUserpasswordComponent,
//     SmsProviderComponent,
//     AddSmsComponent,
//     MultiLanguageComponent,
//     AddLanguageComponent,
//     UpdateSmsComponent,
//     PlayerOtpComponent,
//     EditRolloveramountComponent,
//     ConversationComponent,
//     PlayerIssueComponent,
//     ChangeStatusComponent,
//     PlayerDetailsIssueComponent,
//     AdminDetailsComponent,
//     AddAgentComponent,
//     StatusChangeComponent,
//     ConfirmBoxComponent,
//     UserPromotionComponent
//   ],
 
imports: [
    CommonModule,
    UsersRoutingModule,
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
    FeatherModule.pick(allIcons),
    MatCheckboxModule
  ]
})
export class UsersModule { }
