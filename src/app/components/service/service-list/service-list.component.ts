import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BusinessService } from 'src/app/services/business.service';
import { ToastrService } from 'ngx-toastr';

import { Service } from 'src/app/models/service';


@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  public services: Service[] = [];

  public sortPropPosted = 'name';
  public sortReversePosted = false;

  public term: string;

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.businessService.getServices().subscribe(
      (serviceResult: Service[]) => {
        this.services = serviceResult.map((s: any) => {
          return {
            id: s.id,
            name: s.nombre,
            monthlyFee: s.cuotaMensual
          };
        });
      },
      error => {
        this.toastr.error('Se produjo un error y no se pudieron recuperar los servicios');
      }
    );
  }

  /**
   * Routes to details of selected service
   * @param service selected
   */
  getServiceDetails(service: Service): void {
    this.router.navigate(['/service/' + service.id]);
  }

  /*
  * Routes to the new service view
	*/
  createService(): void {
    this.router.navigate(['/service/new']);
  }

  /**
   * Routes to the edit service view with specific service
   * @param service to edit
   */
  editService(service: Service) {
    this.router.navigate(['/service/edit/' + service.id]);
  }

  /**
   * Responsible to mange the sorting information
   * @param name to sort
   */
  sortTypePosted(name: string): void {
    this.sortReversePosted = this.sortPropPosted === name ? !this.sortReversePosted : false;
    this.sortPropPosted = name;
  }
}
