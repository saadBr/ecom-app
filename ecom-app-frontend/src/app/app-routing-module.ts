import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Products } from './ui/products/products';
import { Customers } from './ui/customers/customers';
import { canActivateAuthRole } from './guards/auth-guard';
import { ForbiddenComponent } from './ui/forbidden/forbidden-component';
import {Orders} from './ui/orders/orders';
import {OrderDetails} from './ui/order-details/order-details';

const routes: Routes = [
  { path: 'products', component: Products, canActivate: [canActivateAuthRole], data: { role: 'ADMIN' } },
  { path: 'customers', component: Customers, canActivate: [canActivateAuthRole], data: { role: 'USER' } },
  { path: 'orders', component: Orders, canActivate: [canActivateAuthRole], data: { role: 'USER' } },
  { path: 'orders/:id', component: OrderDetails, canActivate: [canActivateAuthRole], data: { role: 'USER' } },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
