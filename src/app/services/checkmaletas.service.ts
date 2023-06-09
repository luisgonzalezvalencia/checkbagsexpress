import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckmaletasService {

  constructor(private http: HttpClient) {

  }

  private urlApi: string = environment.URL_API;

  private get(url: string): Observable<any> {
    return this.http.get(url);
  }

  private post(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

  getPasajeCliente() {
    return this.get(this.urlApi + 'pasajeros');
  }

  getMaletasCliente() {
    return this.get(this.urlApi + 'maletas');
  }

  postMaletasCliente(body: any) {
    return this.post(this.urlApi + 'maletas', body);
  }

}
