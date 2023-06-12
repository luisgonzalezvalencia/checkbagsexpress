import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs/operators';
import { ResponseMaleta } from '../interfaces/interfaces';

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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = { headers };
    return this.http.post(url, body, options);
  }

  private put(url: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = { headers };
    return this.http.put(url, body, options);
  }

  getPasajeCliente() {
    return this.get(this.urlApi + 'pasajeros');
  }

  getMaletasCliente(idCliente: string) {
    return this.get(this.urlApi + 'maletas?pasajeroId=' + idCliente);
  }

  postMaletasCliente(body: any): Observable<ResponseMaleta> {
    return this.post(this.urlApi + 'maletas', body);
  }

  putMaletaPasaje(body: any): Observable<any> {
    return this.put(this.urlApi + 'pasajeros', body);
  }
}
