import { Component, OnInit } from '@angular/core';
import { CheckmaletasService } from '../services/checkmaletas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pasaje, ResponseMaleta, Valija } from '../interfaces/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { CheckPrintComponent } from '../check-print/check-print.component';

@Component({
  selector: 'app-check-maleta',
  templateUrl: './check-maleta.component.html',
  styleUrls: ['./check-maleta.component.scss']
})
export class CheckMaletaComponent implements OnInit {

  private idPasaje: string = '';

  public pasajeCliente: Pasaje | undefined;


  public valijaSeleccionada: Valija | undefined;
  public valijaIsSelected = false;

  public valijaPesada: number | undefined;

  public isLoading: boolean = false;

  constructor(private router: Router, private checkMaletasService: CheckmaletasService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //obtener de la ruta actual el id
    this.idPasaje = this.activatedRoute.snapshot.params['id'];
    this.obtenerPasaje();
  }

  obtenerPasaje() {
    if (this.idPasaje !== '') {

      this.isLoading = true;
      this.checkMaletasService.getPasajeCliente().subscribe((pasajes: Pasaje[]) => {
        if (pasajes.length > 0) {
          let pasajeEncontrado = pasajes.find(pasaje => pasaje._id == this.idPasaje);
          if (pasajeEncontrado) {
            this.pasajeCliente = pasajeEncontrado;
            this.isLoading = false;
          } else {
            console.log("Pasaje no encontrado");
            this.router.navigate(['/inicio']);
          }
        } else {
          console.log(pasajes);
        }
      })
    }
  }

  imageValija(peso: number) {
    let pesoD = peso;
    if (pesoD < 25) {
      return "assets/images/1-24.jpg"
    }

    if (pesoD < 30) {
      return "assets/images/25-29.jpg"
    }

    return "assets/images/30-99.jpg"

  }

  seleccionarValija(valijaId: string) {
    this.valijaSeleccionada = this.pasajeCliente?.maletas.find(v => v.maleta_id == valijaId);
    this.valijaIsSelected = true;

    setTimeout(() => {
      this.generarPesoRandom();
    }, 2000)
  }

  generarPesoRandom() {

    setTimeout(() => {
      let minimmo = 7;
      let promedioExceso = 2;
      //obtener un random entre 9 kg y el maximmo permitido y 2 kg mas o menos que se pudo pasar el pasajero
      let peso = Math.floor(Math.random() * (this.valijaSeleccionada?.peso || 0 - minimmo + promedioExceso)) + minimmo;
      this.valijaPesada = peso;
    }, 1000)

  }

  pesoOk() {
    if (this.valijaPesada && this.valijaPesada <= (this.valijaSeleccionada?.peso || 0)) {
      return true;
    }

    return false;
  }

  //registra la maleta e imprimir el ticket
  openPrintComponent(): void {

    this.isLoading = true;
    //datos de la maleta
    let datosMaleta = {
      "vuelo": this.pasajeCliente?.numeroVuelo,
      "pasajeroId": this.pasajeCliente?._id,
      "maletaId": this.valijaSeleccionada?.maleta_id,
      "peso": this.valijaPesada,
      "despachada": false
    }

    this.checkMaletasService.postMaletasCliente(datosMaleta).subscribe((response: ResponseMaleta) => {
      this.isLoading = false;
      if (response.message == "Maleta creada exitosamente") {
        //redirijo a la ruta de impresion del ticket
        this.router.navigate(['imprimirticket', this.valijaSeleccionada?.maleta_id], { queryParams: { idCliente: this.pasajeCliente?._id } });
      } else {
        console.log(response.message);
      }
    });
  }

  pagarPesoExtra() {
    let pesoExtra = (this.valijaPesada || 0) - (this.valijaSeleccionada?.peso || 0);
    this.router.navigate(['payment', this.valijaSeleccionada?.maleta_id + "-peso-" + pesoExtra.toFixed(2)]);
  }

  comprarEquipajeExtra() {
    this.router.navigate(['comprarEquipaje', this.idPasaje]);
  }
}
