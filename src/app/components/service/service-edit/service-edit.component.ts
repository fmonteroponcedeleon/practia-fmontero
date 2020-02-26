import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BusinessService } from 'src/app/services/business.service';
import { ToastrService } from 'ngx-toastr';

import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {

  public serviceId: number;
  public service: Service = new Service();

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private route: ActivatedRoute,
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
          this.toastr.error('Se produjo un error y no se pudo recuperar el servicio');
        }
      );
    });
  }

  /**
   * Responsible to edit the information of a specific service
   */
  onSubmit(): void {
    this.businessService.editService(this.service).subscribe(
      (serviceResult: string) => {
        this.toastr.success('Servicio editado con exito!');
        this.router.navigate(['/services']);
      },
      error => {
        this.toastr.error('Se produjo un error y no se pudo editar el servicio');
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
