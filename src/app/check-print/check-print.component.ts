import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as JsBarcode from 'jsbarcode';
import { CheckmaletasService } from '../services/checkmaletas.service';
import { Maletas, Pasaje } from '../interfaces/interfaces';

@Component({
  selector: 'app-check-print',
  templateUrl: './check-print.component.html',
  styleUrls: ['./check-print.component.scss']
})
export class CheckPrintComponent implements OnInit, AfterViewInit {
  passengerName: string = 'John Doe';
  flightFrom: string = 'New York';
  flightTo: string = 'Paris';


  idMaleta: string = "";
  idCliente: string = "";
  isLoading: boolean = false;
  public pasajeCliente: Pasaje | undefined = undefined;

  maletaPrint: Maletas | undefined;

  @ViewChild('barcode1', { static: true }) barcode1!: ElementRef;
  @ViewChild('barcode2', { static: true }) barcode2!: ElementRef;

  constructor(private elementRef: ElementRef, private activatedRoute: ActivatedRoute, private checkMaletasService: CheckmaletasService) { }

  ngOnInit(): void {

    this.idMaleta = this.activatedRoute.snapshot.params['id'];
    this.idCliente = this.activatedRoute.snapshot.queryParams.idCliente;
    this.obtenerMaleta();


  }

  obtenerMaleta() {
    if (this.idMaleta !== '') {

      this.isLoading = true;
      this.checkMaletasService.getMaletasCliente(this.idCliente).subscribe((response) => {
        let maletas: Maletas[] = response?.maletas || null;
        if (maletas && maletas.length > 0) {
          let maletaEncontrada = maletas.find(maleta => maleta.maletaId == this.idMaleta);
          if (maletaEncontrada) {
            this.maletaPrint = maletaEncontrada;
            this.isLoading = false;

            this.checkMaletasService.getPasajeCliente().subscribe((pasajes: Pasaje[]) => {
              if (pasajes.length > 0) {
                let pasajeEncontrado = pasajes.find(pasaje => pasaje._id == this.idCliente);
                if (pasajeEncontrado) {
                  //redirect al checkbaggage del pase.
                  this.pasajeCliente = pasajeEncontrado;

                  setTimeout(() => {
                    this.print();
                  }, 2000);
                } else {
                  console.log("Pasaje no encontrado");
                }
              } else {
                console.log(pasajes);
              }
              this.isLoading = false;

            })

            this.generateBarcodes();
          } else {
            console.log("maleta no encontrada");
            // this.router.navigate(['/inicio']);
          }
        } else {
          console.log(maletas);
        }
      })
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // this.generateBarcodes();
    }, 0);
  }

  generateBarcodes(): void {
    JsBarcode(this.barcode1.nativeElement, (this.maletaPrint?.maletaId || "code-maleta"), {
      format: 'CODE128',
      displayValue: true,
      width: 2,
      height: 40
    });

    JsBarcode(this.barcode2.nativeElement, (this.maletaPrint?.pasajeroId || "code-pasajero"), {
      format: 'CODE128',
      displayValue: true,
      width: 2,
      height: 40
    });
  }

  print(): void {
    window.print();
  }
}
