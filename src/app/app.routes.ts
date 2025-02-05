import { Routes } from '@angular/router';
import { ForgotPasswordComponent } from '@auth/forgot-password/forgot-password.component';
import { LoginComponent } from '@auth/login/login.component';
import { RecoverPasswordComponent } from '@auth/recover-password/recover-password.component';
import { RegisterComponent } from '@auth/register/register.component';
import { MainComponent } from '@common/main/main.component';
import { AuthGuard } from '@guards/auth.guard';
import { NonAuthGuard } from '@guards/non-auth.guard';
import { RoleauthGuard } from '@guards/role-auth.guard';
import { BankUpiListComponent } from '@modules/bank/bank-upi-list/bank-upi-list.component';
import { DepositPgAmountComponent } from '@modules/bank/deposit-pg-amount/deposit-pg-amount.component';
import { PaymentGatewayMasterComponent } from '@modules/bank/payment-gateway-master/payment-gateway-master.component';
import { CreateIssueComponent } from '@modules/crm/create-issue/create-issue.component';
import { MyIssueComponent } from '@modules/crm/my-issue/my-issue.component';
import { BulkLeadComponent } from '@modules/leads/bulk-lead/bulk-lead.component';
import { CallDetailsComponent } from '@modules/leads/call-details/call-details.component';
import { CallLeadComponent } from '@modules/leads/call-lead/call-lead.component';
import { ClaimbonusComponent } from '@modules/promo/claimbonus/claimbonus.component';
import { DepositpromoComponent } from '@modules/promo/depositpromo/depositpromo.component';
import { SpinwheelComponent } from '@modules/promo/spinwheel/spinwheel.component';
import { NewRegisterListComponent } from '@modules/report/new-register-list/new-register-list.component';
import { RegisterListComponent } from '@modules/report/register-list/register-list.component';
import { UserBonusComponent } from '@modules/report/user-bonus/user-bonus.component';
import { UserDepositListComponent } from '@modules/report/user-deposit-list/user-deposit-list.component';
import { AddAdminComponent } from '@modules/users/add-admin/add-admin.component';
import { AdminDetailsComponent } from '@modules/users/add-admin/admin-details/admin-details.component';
import { AddAgentComponent } from '@modules/users/add-agent/add-agent.component';
import { CallRequestComponent } from '@modules/users/call-request/call-request.component';
import { CreateUserComponent } from '@modules/users/create-user/create-user.component';
import { EditplayerComponent } from '@modules/users/editplayer/editplayer.component';
import { MultiLanguageComponent } from '@modules/users/multi-language/multi-language.component';
import { PlayerDetailsComponent } from '@modules/users/player-details/player-details.component';
import { PlayerIssueComponent } from '@modules/users/player-issue/player-issue.component';
import { PlayerListComponent } from '@modules/users/player-list/player-list.component';
import { PlayerOtpComponent } from '@modules/users/player-otp/player-otp.component';
import { SmsProviderComponent } from '@modules/users/sms-provider/sms-provider.component';
import { WithdrawalRequestComponent } from '@modules/users/withdrawal-request/withdrawal-request.component';
import { GroupComponent } from '@modules/viptemp/group/group.component';
import { LevelComponent } from '@modules/viptemp/level/level.component';
import { LeveltempconfigComponent } from '@modules/viptemp/leveltempconfig/leveltempconfig.component';
import { PlayerComponent } from '@modules/viptemp/player/player.component';
import { TempfeatureconfigComponent } from '@modules/viptemp/tempfeatureconfig/tempfeatureconfig.component';
import { TemplateComponent } from '@modules/viptemp/template/template.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
            },





            // {
            //     path: 'users',
            //     canActivate: [RoleauthGuard],
            //     canActivateChild: [RoleauthGuard],
            //     loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule)
            // },
            {
                path: 'users/createuser',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule)
                component: CreateUserComponent        
            },
            {
                path: 'users/searchplayer',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule)
                component: PlayerListComponent        
            },
            {
                path: 'users/callrequest',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule)
                component: CallRequestComponent        
            },
            {
                path: 'users/playerdetailview/:id',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule)
                component: PlayerDetailsComponent        
            },
            {
                path: 'users/withdrawalrequest',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule)
                component: WithdrawalRequestComponent        
            },
            {
                path: 'users/alladmins',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule)
                component: AddAdminComponent        
            },
            {
                path: 'users/editplayer',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule)
                component: EditplayerComponent        
            },
            {
                path: 'users/editplayer',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule)
                component: EditplayerComponent        
            },
            {
                path: 'users/smsserviceprovider',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule)
                component: SmsProviderComponent        
            },
            {
                path: 'users/multilanguage',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule)
                component: MultiLanguageComponent        
            },
            {
                path: 'users/playerotp',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule)
                component: PlayerOtpComponent        
            },
            {
                path: 'users/playerissue',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule)
                component: PlayerIssueComponent        
            },
            {
                path: 'users/adminview',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule)
                component: AdminDetailsComponent        
            },
            {
                path: 'users/getalladminagent',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule)
                component: AddAgentComponent        
            },






            // {
            //     path: 'bank',
            //     canActivate: [RoleauthGuard],
            //     canActivateChild: [RoleauthGuard],
            //     loadChildren: () => import('@modules/bank/bank.module').then(m => m.BankModule)
            // },

            {
                path: 'bank/paymentgatewaymaster',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/bank/bank.module').then(m => m.BankModule)
                component: PaymentGatewayMasterComponent
            },
            {
                path: 'bank/upilist',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/bank/bank.module').then(m => m.BankModule)
                component: BankUpiListComponent
            },
            {
                path: 'bank/depositpgamount',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/bank/bank.module').then(m => m.BankModule)
                component: DepositPgAmountComponent
            },





            // {
            //     path: 'report',
            //     canActivate: [RoleauthGuard],
            //     canActivateChild: [RoleauthGuard],
            //     loadChildren: () => import('@modules/report/report.module').then(m => m.ReportModule)
            // },
            {
                path: 'report/registerlist',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/report/report.module').then(m => m.ReportModule)
                component: NewRegisterListComponent
            },
            {
                path: 'report/userdeposit',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/report/report.module').then(m => m.ReportModule)
                component: UserDepositListComponent
            },
            {
                path: 'report/userbonus',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/report/report.module').then(m => m.ReportModule)
                component: UserBonusComponent
            },




            

            {
                path: 'creator',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                loadChildren: () => import('@modules/creator/creator.module').then(m => m.CreatorModule)
            },

            // {
            //     path: 'promo',
            //     canActivate: [RoleauthGuard],
            //     canActivateChild: [RoleauthGuard],
            //     loadChildren: () => import('@modules/promo/promo.module').then(m => m.PromoModule)
            // },
            {
                path: 'promo/depositpromo',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/promo/promo.module').then(m => m.PromoModule)
                component: DepositpromoComponent
                
            },
            {
                path: 'promo/scratchcard',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/promo/promo.module').then(m => m.PromoModule)
                component: ClaimbonusComponent
                
            },
            {
                path: 'promo/spinwheel',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/promo/promo.module').then(m => m.PromoModule)
                component: SpinwheelComponent
                
            },





            // {
            //     path: 'crmissuetracker',
            //     canActivate: [RoleauthGuard],
            //     canActivateChild: [RoleauthGuard],
            //     loadChildren: () => import('@modules/crm/crm.module').then(m => m.CrmModule)
            // },
            {
                path: 'crmissuetracker/createissue',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/crm/crm.module').then(m => m.CrmModule)
                component:CreateIssueComponent
            },
            {
                path: 'crmissuetracker/getallcrmissue',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/crm/crm.module').then(m => m.CrmModule)
                component:MyIssueComponent
            },


            // {
            //     path: 'viptemp',
            //     canActivate: [RoleauthGuard],
            //     canActivateChild: [RoleauthGuard],
            //     loadChildren: () => import('@modules/viptemp/viptemp.module').then(m=>m.ViptempModule)
            // }
            {
                path: 'viptemp/group',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/viptemp/viptemp.module').then(m=>m.ViptempModule)
                component: GroupComponent
            },
            {
                path: 'viptemp/template',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/viptemp/viptemp.module').then(m=>m.ViptempModule)
                component: TemplateComponent
            },
            {
                path: 'viptemp/level',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/viptemp/viptemp.module').then(m=>m.ViptempModule)
                component: LevelComponent
            },
            {
                path: 'viptemp/leveltempconfig',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/viptemp/viptemp.module').then(m=>m.ViptempModule)
                component: LeveltempconfigComponent
            },
            {
                path: 'viptemp/tempfeatureconfig',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/viptemp/viptemp.module').then(m=>m.ViptempModule)
                component: TempfeatureconfigComponent
            },
            {
                path: 'viptemp/player',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/viptemp/viptemp.module').then(m=>m.ViptempModule)
                component: PlayerComponent
            },






            // {
            //     path: 'leads',
            //     canActivate: [RoleauthGuard],
            //     canActivateChild: [RoleauthGuard],
            //     loadChildren: () => import('@modules/leads/leads.module').then(m => m.LeadsModule)
            // },
            {
                path: 'leads/myleads',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/leads/leads.module').then(m => m.LeadsModule)
                component: CallLeadComponent
                
            },
            {
                path: 'leads/bulklead',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/leads/leads.module').then(m => m.LeadsModule)
                component: BulkLeadComponent
                
            },
            {
                path: 'leads/calldetails',
                canActivate: [RoleauthGuard],
                canActivateChild: [RoleauthGuard],
                // loadChildren: () => import('@modules/leads/leads.module').then(m => m.LeadsModule)
                component: CallDetailsComponent
                
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'change-password',
        component: RecoverPasswordComponent,
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '' }
];
