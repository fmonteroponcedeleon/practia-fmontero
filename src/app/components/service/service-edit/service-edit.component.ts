import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { BusinessService } from 'src/app/services/business.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute) { }

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
          // TODO: Handling error!
        }
      );
    });
  }

  onSubmit(): void {
    this.businessService.editService(this.service).subscribe(
      (serviceResult: string) => {
        this.router.navigate(['/services']);
        // TODO: Toastr notification!
      },
      error => {
        // TODO: Handling error!
      }
    );
  }

  back(): void {
    this.router.navigate(['/services']);
  }

}
