import { Injectable } from '@angular/core';

import { BusinessMockData } from './business-mock.data';
import { Observable, of } from 'rxjs';
import { Customer } from '../models/customer';
import { Service } from '../models/service';

@Injectable()
export class BusinessMockService {

  constructor() { }

  /**
   * Responsible to retrieve the customers from the server
   */
  getCustomers(): Observable<Customer[]> {
    return of(BusinessMockData.CUSTOMERS);
  }

  /**
   * Responsible to retrieve a specific customers from the server
   */
  getCustomerById(customerId: number): Observable<Customer> {
    return of(BusinessMockData.CUSTOMERS.find(c => c.id === customerId));
  }

  /**
   * Responsible to create a new customer
   * @param fullName full name
   * @param documentNumber document number
   * @param address address
   * @param phone phone
   * @param dateOfBirth date of birth 
   */
  createCustomer(fullName: string, documentNumber: string, address: string, phone: string, dateOfBirth: string): Observable<string> {
    return of('');
  }

  /**
   * Responsible to edit a customer
   * @param customer to edit
   */
  editCustomer(customer: Customer): Observable<string> {
    return of('');
  }

  /**
   * Responsible to delete a customer
   * @param customerId the customer id to delete
   */
  deleteCustomer(customerId: number): Observable<string> {
    return of('');
  }

  /**
   * Responsible to retrieve the service from the server
   */
  getServices(): Observable<Service[]> {
    return of(BusinessMockData.SERVICES);
  }

  /**
   * Responsible to retrieve a specific service from the server
   */
  getServiceById(serviceId: number): Observable<Service> {
    return of(BusinessMockData.SERVICES.find(s => s.id === serviceId));
  }

  /**
   * Responsible to create a service
   * @param name name
   * @param monthlyFee monthly fee
   */
  createService(name: string, monthlyFee: string): Observable<string> {
    return of('');
  }

  /**
   * Responsible to edit a service
   * @param service to edit
   */
  editService(service: Service): Observable<string> {
    return of('');
  }

  /**
   * Responsible to delete a service
   * @param serviceId the service id to delete
   */
  deleteService(serviceId: number): Observable<string> {
    return of('');
  }

  /**
   * Responsible to associate a service with a customer
   * @param serviceId to associate
   * @param customerId to associate
   * @param dateOfAssociation date of the association
   */
  associateServiceCustomer(serviceId: number, customerId: number, dateOfAssociation: Date): Observable<string> {
    return of('');
  }

  /**
   * Responsible to desassociate a service with a customer
   * @param serviceCustomerId to desassociate
   */
  desassociateServiceCustomer(serviceCustomerId: number): Observable<string> {
    return of('');
  }

  /**
   * Responsible to retrieve the associations between customer and service from the server
   */
  getServiceCustomer(): Observable<any[]> {
    return of(BusinessMockData.SERVICES_CUSTOMERS);
  }
}
