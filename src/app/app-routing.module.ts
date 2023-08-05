import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardsComponent } from './admin/components/dashboards/dashboards.component';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [
      { path: "", component: DashboardsComponent },
      { path: "customers", loadChildren: () => import("./admin/components/customers/customers.module").then(i => i.CustomersModule) },
      { path: "products", loadChildren: () => import("./admin/components/products/products.module").then(i => i.ProductsModule) },
      { path: "orders", loadChildren: () => import("./admin/components/orders/orders.module").then(i => i.OrdersModule) },
    ]
  },
  { path: "", component: HomeComponent },
  { path: "products", loadChildren: () => import("./ui/components/products/products.module").then(i => i.ProductsModule) },
  { path: "baskets", loadChildren: () => import("./ui/components/baskets/baskets.module").then(i => i.BasketsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
