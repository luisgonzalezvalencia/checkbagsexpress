import { Component, OnInit } from '@angular/core';
import { CheckmaletasService } from '../services/checkmaletas.service';
import { Router } from '@angular/router';


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
  constructor(private checkMaletasService: CheckmaletasService, private router: Router) { }

  ngOnInit(): void {
    document.getElementById('boarding-code')?.focus();
  }

  verificarPasaje() {
    if (this.boardingpass !== '') {

      this.checkMaletasService.getPasajeCliente().subscribe((pasajes: Pasaje[]) => {
        if (pasajes.length > 0) {
          console.log("Pasaje encontrado");
          let pasajeEncontrado = pasajes.find(pasaje => pasaje.vuelo == this.boardingpass);
          if (pasajeEncontrado) {
            //redirect al checkbaggage del pase.
            this.router.navigate(['/checkmaleta', pasajeEncontrado._id]);
          } else {
            console.log("Pasaje no encontrado");
            this.router.navigate(['/checkmaleta', 1]);
          }
        } else {
          console.log(pasajes);
        }
      })
    }

  }

}
