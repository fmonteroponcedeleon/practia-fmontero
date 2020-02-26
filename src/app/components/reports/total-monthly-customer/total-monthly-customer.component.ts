import { Component, OnInit } from '@angular/core';

import { BusinessService } from 'src/app/services/business.service';

import { Customer } from 'src/app/models/customer';
import { Service } from 'src/app/models/service';
import { ServiceCustomer } from 'src/app/models/service-customer';
import { TotalMonthlyCustomer } from 'src/app/models/total-monthly-customer';

@Component({
  selector: 'app-total-monthly-customer',
  templateUrl: './total-monthly-customer.component.html',
  styleUrls: ['./total-monthly-customer.component.css']
})
export class TotalMonthlyCustomerComponent implements OnInit {

  public customers: Customer[] = [];
  public services: Service[] = [];
  public servicesCustomers: ServiceCustomer[] = [];
  public totalMonthlyCustomers: TotalMonthlyCustomer[] = [];

  public isLoadingCustomers = false;
  public isLoadingServices = false;
  public isLoadingServiceCustomers = false;

  public sortPropPosted = 'fullName';
  public sortReversePosted = false;

  constructor(private businessService: BusinessService) { }

  ngOnInit() {
    this.getCustomers();
    this.getServices();
    this.getServiceCustomer();
  }

  getCustomers(): void {
    this.isLoadingCustomers = true;
    this.businessService.getCustomers().subscribe(
      (serviceResult: any[]) => {
        this.customers = serviceResult.map((c: any) => {
          return {
            id: c.id,
            fullName: c.nombreCompleto,
            documentNumber: c.cedula,
            address: c.direccion,
            phone: c.telefono,
            dateOfBirth: c.fechaNacimiento
          };
        });
        console.log('customers', this.customers);
        this.isLoadingCustomers = false;
        if (this.isLoadingFinished()) {
          this.calculateTotalMonthlyAmountPerCustomer();
        }
      },
      error => {
        // TODO: Handling error
        this.isLoadingCustomers = false;
      }
    );
  }

  getServices(): void {
    this.isLoadingServices = true;
    this.businessService.getServices().subscribe(
      (serviceResult: any[]) => {
        this.services = serviceResult.map((s: any) => {
          return {
            id: s.id,
            name: s.nombre,
            monthlyFee: s.cuotaMensual
          };
        });
        console.log('services', this.services);
        this.isLoadingServices = false;
        if (this.isLoadingFinished()) {
          this.calculateTotalMonthlyAmountPerCustomer();
        }
      },
      error => {
        // TODO: Handling error
        this.isLoadingServices = false;
      }
    );
  }

  getServiceCustomer(): void {
    this.isLoadingServiceCustomers = true;
    this.businessService.getServiceCustomer().subscribe(
      (serviceResultGet: any) => {
        this.servicesCustomers = serviceResultGet.map((sc: any) => {
          return {
            id: sc.id,
            customerId: sc.clienteId,
            serviceId: sc.servicioId,
            dateOfAssociation: sc.fechaAsociado
          };
        });
        console.log('serviceCustomers', this.servicesCustomers);
        this.isLoadingServiceCustomers = false;
        if (this.isLoadingFinished()) {
          this.calculateTotalMonthlyAmountPerCustomer();
        }
      },
      error => {
        // TODO: Handling error
        this.isLoadingServiceCustomers = false;
      }
    );
  }

  isLoadingFinished(): boolean {
    return !this.isLoadingCustomers && !this.isLoadingServices
      && !this.isLoadingServiceCustomers ? true : false;
  }

  calculateTotalMonthlyAmountPerCustomer(): void {
    console.log('calculateTotalMonthlyAmountPerCustomer');
    for (let i = 0; i < this.customers.length; i++) {
      for (let j = 0; j < this.servicesCustomers.length; j++) {
        if (this.customers[i].id === this.servicesCustomers[j].customerId) {
          let serviceCustomer = this.servicesCustomers[j];
          let service = this.services.find(s => s.id === serviceCustomer.serviceId);
          let serviceMonthlyFee = !!service ? service.monthlyFee : 0;

          // TODO: Isolate with new function!
          let totalMonthlyCustomer = this.totalMonthlyCustomers.find(
            tmc => tmc.customerId === serviceCustomer.customerId
              && tmc.month === new Date(serviceCustomer.dateOfAssociation).getMonth() + 1
              && tmc.year === new Date(serviceCustomer.dateOfAssociation).getFullYear());

          if (!!totalMonthlyCustomer) {
            totalMonthlyCustomer.totalAmount = totalMonthlyCustomer.totalAmount + serviceMonthlyFee;
          } else {
            totalMonthlyCustomer = new TotalMonthlyCustomer();
            totalMonthlyCustomer.customerId = this.customers[i].id;
            totalMonthlyCustomer.fullName = this.customers[i].fullName;
            totalMonthlyCustomer.documentNumber = this.customers[i].documentNumber;
            totalMonthlyCustomer.totalAmount = serviceMonthlyFee;
            console.log('serviceCustomer', serviceCustomer);
            totalMonthlyCustomer.month = new Date(serviceCustomer.dateOfAssociation).getMonth() + 1;
            totalMonthlyCustomer.year = new Date(serviceCustomer.dateOfAssociation).getFullYear();
            this.totalMonthlyCustomers.push(totalMonthlyCustomer);
          }
        }
      }
    }
    console.log('totalMonthlyCustomers', this.totalMonthlyCustomers);
  }

  sortTypePosted(name: string): void {
    this.sortReversePosted = this.sortPropPosted === name ? !this.sortReversePosted : false;
    this.sortPropPosted = name;
  }
}
