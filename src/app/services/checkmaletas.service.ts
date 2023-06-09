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
    // return fetch(
    //   url, // the url you are trying to access
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     method: 'GET', // GET, POST, PUT, DELETE
    //     mode: 'no-cors' // the most important option
    //   }
    // )
  }



  getPasajeCliente() {
    return this.get(this.urlApi + 'pasajeros');
  }
}
