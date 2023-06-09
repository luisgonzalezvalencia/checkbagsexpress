import { Component, OnInit } from '@angular/core';
import { CheckmaletasService } from '../services/checkmaletas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pasaje, Valija } from '../interfaces/interfaces';

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

  constructor(private router: Router, private checkMaletasService: CheckmaletasService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //obtener de la ruta actual el id
    this.idPasaje = this.activatedRoute.snapshot.params['id'];
    this.obtenerPasaje();
  }

  obtenerPasaje() {
    if (this.idPasaje !== '') {

      this.checkMaletasService.getPasajeCliente().subscribe((pasajes: Pasaje[]) => {
        if (pasajes.length > 0) {
          let pasajeEncontrado = pasajes.find(pasaje => pasaje._id == this.idPasaje);
          if (pasajeEncontrado) {
            this.pasajeCliente = pasajeEncontrado;
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

  seleccionarValija(valijaId: string) {
    this.valijaSeleccionada = this.pasajeCliente?.valijas.find(v => v.maleta_id == valijaId);
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
      let peso = Math.floor(Math.random() * (parseFloat(this.valijaSeleccionada?.peso?.$numberDecimal || "0") - minimmo + promedioExceso)) + minimmo;
      this.valijaPesada = peso;
    }, 1000)

  }
}
