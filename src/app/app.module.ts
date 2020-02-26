import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { OrderModule } from 'ngx-order-pipe';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { APP_ROUTING } from './app-routing.module';

import { BusinessService } from './services/business.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    CustomerNewComponent,
    CustomerEditComponent,
    ServiceListComponent,
    ServiceDetailComponent,
    ServiceNewComponent,
    ServiceEditComponent,
    ServiceCustomerComponent,
    TotalMonthlyCustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    OrderModule,
    AngularFontAwesomeModule,
    Ng2SearchPipeModule
  ],
  providers: [
    BusinessService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
