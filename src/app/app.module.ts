import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    ServiceEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [
    BusinessService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
