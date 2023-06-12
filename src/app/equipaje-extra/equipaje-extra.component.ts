import { Component, OnInit } from '@angular/core';
import { Pasaje, Valija } from '../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckmaletasService } from '../services/checkmaletas.service';

@Component({
  selector: 'app-equipaje-extra',
  templateUrl: './equipaje-extra.component.html',
  styleUrls: ['./equipaje-extra.component.scss']
})
export class EquipajeExtraComponent implements OnInit {


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

  imageValija(peso: string) {
    let pesoD = parseFloat(peso);
    if (pesoD < 25) {
      return "assets/images/1-24.jpg"
    }

    if (pesoD < 30) {
      return "assets/images/25-29.jpg"
    }

    return "assets/images/30-99.jpg"

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

  obtenerPrecio(peso: string) {
    let pesoD = parseFloat(peso);
    if (pesoD < 20) {
      return 3500;
    }

    if (pesoD < 25) {
      return 5500;
    }

    if (pesoD < 30) {
      return 7500;
    }

    return 9000;
  }

  comprarMaleta(peso: string) {
    this.router.navigate(['payment', "pje-" + this.idPasaje + "-peso-" + peso]);
  }
}
