import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css'],
})
export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos(): void {
    console.log('0');
    this.productoService.lista().subscribe(
      (data) => {
        this.productos = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  delete(id : any) {
    this.productoService.delete(id).subscribe(
      (data) => {
        this.toastr.success('Producto eliminado', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.cargarProductos();
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'Fallo', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }
}
