import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MasterComponent } from './template/master/master.component';
import { ViewProductsComponent } from './pages/view-products/view-products.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CategoryComponent } from './pages/category/category.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { ProductComponent } from './pages/product/product.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';

const routes: Routes = [

  { path: "", redirectTo: 'login', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "organic-bazaar", component: MasterComponent,
    children: [
      {
        path: "view-products", component: ViewProductsComponent,
      },
      {
        path: "order-product/:id", component: CheckoutComponent,
      },
      {
        path: "category", component: CategoryComponent,
      },
      {
        path: "subscription", component: SubscriptionComponent,
      },
      {
        path: "product", component: ProductComponent,
      },
      {
        path: "my-orders", component: MyOrdersComponent,
      },
    ]

    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
