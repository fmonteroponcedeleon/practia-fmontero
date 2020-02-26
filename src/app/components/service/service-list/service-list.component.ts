import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BusinessService } from 'src/app/services/business.service';

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
    private router: Router) { }

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
        // TODO: Handling error
      }
    );
  }

  /*
	 * Routes to the details of the service selected.
	 */
  getServiceDetails(service: Service): void {
    this.router.navigate(['/service/' + service.id]);
  }

  /*
  * Routes to the new service component.
	*/
  createService(): void {
    this.router.navigate(['/service/new']);
  }

  editService(service: Service) {
    this.router.navigate(['/service/edit/' + service.id]);
  }

  sortTypePosted(name: string): void {
    this.sortReversePosted = this.sortPropPosted === name ? !this.sortReversePosted : false;
    this.sortPropPosted = name;
  }

}
