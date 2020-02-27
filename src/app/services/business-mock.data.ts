import { TotalMonthlyCustomer } from '../models/total-monthly-customer';

export class BusinessMockData {

    public static CUSTOMERS: any[] = [
        {
            id: 1,
            nombreCompleto: 'Pablo Acosta',
            cedula: '66913574',
            direccion: 'Bulevar Artigas 1261',
            telefono: '22085421',
            fechaNacimiento: new Date('1993-02-25T00:00:00')
        },
        {
            id: 2,
            nombreCompleto: 'Ana Perez',
            cedula: '89541695',
            direccion: 'San Martin 1454',
            telefono: '22085781',
            fechaNacimiento: new Date('1987-05-21T00:00:00')
        },
        {
            id: 3,
            nombreCompleto: 'Carmen Gonzalez',
            cedula: '42691449',
            direccion: 'San Martin 2454',
            telefono: '22081281',
            fechaNacimiento: new Date('1983-03-05T00:00:00')
        },
    ];

    public static SERVICES: any[] = [
        {
            id: 1,
            nombre: 'Seguro Hogar',
            cuotaMensual: 200
        },
        {
            id: 2,
            nombre: 'Seguro Auto',
            cuotaMensual: 100
        },
        {
            id: 3,
            nombre: 'Seguro De vida',
            cuotaMensual: 50
        },
        {
            id: 4,
            nombre: 'Seguro Electrónico',
            cuotaMensual: 500
        },
        {
            id: 5,
            nombre: 'Servicio Test',
            cuotaMensual: 300
        }
    ];

    public static SERVICES_CUSTOMERS: any[] = [
        {
            servicioId: 1,
            clienteId: 2,
            fechaAsociado: new Date('2020-02-25T08:47:05.676Z'),
            id: 1
        },
        {
            servicioId: 2,
            clienteId: 2,
            fechaAsociado: new Date('2020-02-25T18:31:22.351Z'),
            id: 2
        }
    ];

    public static TOTAL_MONTHLY_CUSTOMER: TotalMonthlyCustomer[] = [
        {
            customerId: 2,
            fullName: 'Ana Perez',
            documentNumber: '89541695',
            totalAmount: 300,
            month: 2,
            year: 2020,
        }
    ];
}
