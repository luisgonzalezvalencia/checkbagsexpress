import { Component, OnInit } from '@angular/core';
import { CheckmaletasService } from '../services/checkmaletas.service';
import { Router } from '@angular/router';
import { Pasaje } from '../interfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],

})
export class InicioComponent implements OnInit {

  public boardingpass: string = '';
  public isLoading: boolean = false;

  constructor(private checkMaletasService: CheckmaletasService, private router: Router) { }

  ngOnInit(): void {
    document.getElementById('boarding-code')?.focus();
  }

  verificarPasaje() {
    if (this.boardingpass !== '') {
      this.isLoading = true;
      this.checkMaletasService.getPasajeCliente().subscribe((pasajes: Pasaje[]) => {
        if (pasajes.length > 0) {
          console.log("Pasaje encontrado");
          let pasajeEncontrado = pasajes.find(pasaje => pasaje.numeroVuelo == this.boardingpass);
          if (pasajeEncontrado) {
            //redirect al checkbaggage del pase.
            this.router.navigate(['/checkmaleta', pasajeEncontrado._id]);
          } else {
            console.log("Pasaje no encontrado");
          }
        } else {
          console.log(pasajes);
        }
      })
    }

  }

}
