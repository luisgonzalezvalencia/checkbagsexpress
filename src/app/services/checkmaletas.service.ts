import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckmaletasService {

  constructor() {

  }

  private urlApi: string = environment.URL_API;

  private get(url: string) {
    return fetch(url)
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  getPasajeCliente() {
    return this.get(this.urlApi + 'pasajeros');
  }
}
