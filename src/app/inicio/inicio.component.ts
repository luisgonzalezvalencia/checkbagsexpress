import { Component, OnInit } from '@angular/core';
import { CheckmaletasService } from '../services/checkmaletas.service';


interface Valija {
  $numberDecimal: string;
}
interface Pasaje {
  _id: string;
  nombre: string;
  vuelo: string;
  valijas: Valija[]
}


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],

})
export class InicioComponent implements OnInit {

  public boardingpass: string = '';
  constructor(private checkMaletasService: CheckmaletasService) { }

  ngOnInit(): void {
    document.getElementById('boarding-code')?.focus();
  }

  verificarPasaje() {
    if (this.boardingpass !== '') {
      console.log(this.boardingpass);

      this.checkMaletasService.getPasajeCliente().then((pasajes: Pasaje[]) => {
        if (pasajes.length > 0) {
          let pasajeEncontrado = pasajes.find(pasaje => pasaje.vuelo == this.boardingpass);
          if (pasajeEncontrado) {
            //redirect al checkbaggage del pase.
            //            this.router.navigate(['/checkbaggage', pasajeEncontrado.id

            console.log(pasajeEncontrado);
          } else {
            console.log("Pasaje no encontrado");
          }
        }
      }).catch((error) => {
        console.log(error);
      })
    }

    console.log(this.boardingpass);
  }

}
