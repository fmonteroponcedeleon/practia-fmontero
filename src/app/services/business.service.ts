import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Customer } from '../models/customer';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private headers: HttpHeaders;
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  /**
   * Responsible to retrieve the customers from the server
   */
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl + '/cliente/');
  }

  /**
   * Responsible to retrieve a specific customers from the server
   */
  getCustomerById(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(this.apiUrl + '/cliente/' + customerId);
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
    const body = JSON.stringify({
      nombreCompleto: fullName,
      cedula: documentNumber,
      direccion: address,
      telefono: phone,
      fechaNacimiento: dateOfBirth
    });
    return this.http.post<string>(this.apiUrl + '/cliente/', body, { headers: this.headers });
  }

  /**
   * Responsible to edit a customer
   * @param customer to edit
   */
  editCustomer(customer: Customer): Observable<string> {
    const body = JSON.stringify({
      nombreCompleto: customer.fullName,
      cedula: customer.documentNumber,
      direccion: customer.address,
      telefono: customer.phone,
      fechaNacimiento: customer.dateOfBirth
    });
    return this.http.put<string>(this.apiUrl + '/cliente/' + customer.id, body, { headers: this.headers });
  }

  /**
   * Responsible to delete a customer
   * @param customerId the customer id to delete
   */
  deleteCustomer(customerId: number): Observable<string> {
    return this.http.delete<string>(this.apiUrl + '/cliente/' + customerId);
  }

  /**
   * Responsible to retrieve the service from the server
   */
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl + '/servicios/');
  }

  /**
   * Responsible to retrieve a specific service from the server
   */
  getServiceById(serviceId: number): Observable<Service> {
    return this.http.get<Service>(this.apiUrl + '/servicios/' + serviceId);
  }

  /**
   * Responsible to create a service
   * @param name name
   * @param monthlyFee monthly fee
   */
  createService(name: string, monthlyFee: number): Observable<string> {
    const body = JSON.stringify({
      nombre: name,
      cuotaMensual: monthlyFee
    });
    return this.http.post<string>(this.apiUrl + '/servicios/', body, { headers: this.headers });
  }

  /**
   * Responsible to edit a service
   * @param service to edit
   */
  editService(service: Service): Observable<string> {
    const body = JSON.stringify({
      nombre: service.name,
      cuotaMensual: service.monthlyFee
    });
    return this.http.put<string>(this.apiUrl + '/servicios/' + service.id, body, { headers: this.headers });
  }

  /**
   * Responsible to delete a service
   * @param serviceId the service id to delete
   */
  deleteService(serviceId: number): Observable<string> {
    return this.http.delete<string>(this.apiUrl + '/servicios/' + serviceId);
  }

  /**
   * Responsible to associate a service with a customer
   * @param serviceId to associate
   * @param customerId to associate
   * @param dateOfAssociation date of the association
   */
  associateServiceCustomer(serviceId: number, customerId: number, dateOfAssociation: Date): Observable<string> {
    const body = JSON.stringify({
      servicioId: serviceId,
      clienteId: customerId,
      fechaAsociado: dateOfAssociation
    });
    return this.http.post<string>(this.apiUrl + '/clienteServicio/', body, { headers: this.headers });
  }

  /**
   * Responsible to desassociate a service with a customer
   * @param serviceCustomerId to desassociate
   */
  desassociateServiceCustomer(serviceCustomerId: number): Observable<string> {
    return this.http.delete<string>(this.apiUrl + '/clienteServicio/' + serviceCustomerId);
  }

  /**
   * Responsible to retrieve the associations between customer and service from the server
   */
  getServiceCustomer(): Observable<string> {
    return this.http.get<string>(this.apiUrl + '/clienteServicio');
  }

}
