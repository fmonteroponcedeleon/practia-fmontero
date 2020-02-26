import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BusinessService } from 'src/app/services/business.service';
import { ToastrService } from 'ngx-toastr';

import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {

  public serviceId: number;
  public service: Service = new Service();

  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.serviceId = params.id;
      this.businessService.getServiceById(this.serviceId).subscribe(
        (serviceResult: any) => {
          this.service.id = serviceResult.id;
          this.service.name = serviceResult.nombre;
          this.service.monthlyFee = serviceResult.cuotaMensual;
        },
        error => {
          this.toastr.error('Se produjo un error y no se pudo recuperar el detalle del servicio');
        }
      );
    });
  }

  /**
   * Delete a specific service
   * @param service to delete
   */
  deleteService(service: Service): void {
    this.businessService.deleteService(service.id).subscribe(
      (serviceResult: string) => {
        this.toastr.success('Servicio eliminado con exito!');
        this.router.navigate(['/services']);
      },
      error => {
        this.toastr.error('Se produjo un error y no se pudo eliminar el servicio');
      }
    );
  }

  /**
   * Back to the service list view
   */
  back(): void {
    this.router.navigate(['/services']);
  }

}
