import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerDetailComponent } from './components/customer/customer-detail/customer-detail.component';
import { CustomerNewComponent } from './components/customer/customer-new/customer-new.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';

import { ServiceListComponent } from './components/service/service-list/service-list.component';
import { ServiceDetailComponent } from './components/service/service-detail/service-detail.component';
import { ServiceNewComponent } from './components/service/service-new/service-new.component';
import { ServiceEditComponent } from './components/service/service-edit/service-edit.component';

import { ServiceCustomerComponent } from './components/service-customer/service-customer.component';

import { TotalMonthlyCustomerComponent } from './components/reports/total-monthly-customer/total-monthly-customer.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customer/new', component: CustomerNewComponent },
  { path: 'customer/:id', component: CustomerDetailComponent },
  { path: 'customer/edit/:id', component: CustomerEditComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'service/new', component: ServiceNewComponent },
  { path: 'service/:id', component: ServiceDetailComponent },
  { path: 'service/edit/:id', component: ServiceEditComponent },
  { path: 'service-customer', component: ServiceCustomerComponent },
  { path: 'total-monthly-customer', component: TotalMonthlyCustomerComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
