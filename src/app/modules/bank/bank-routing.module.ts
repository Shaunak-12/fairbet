import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentGatewayMasterComponent } from './payment-gateway-master/payment-gateway-master.component';
import { DepositPgAmountComponent } from './deposit-pg-amount/deposit-pg-amount.component';

// const routes: Routes = [
//   {
//     path: 'paymentgatewaymaster',
//     component: PaymentGatewayMasterComponent
//   },
//   {
//     path: 'depositpgamount',
//     component: DepositPgAmountComponent
//   }
// ];

@NgModule({
  // imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
