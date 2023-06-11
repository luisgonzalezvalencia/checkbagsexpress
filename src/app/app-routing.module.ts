import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CheckMaletaComponent } from './check-maleta/check-maleta.component';
import { CheckPrintComponent } from './check-print/check-print.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'checkmaleta/:id', component: CheckMaletaComponent },
  { path: 'imprimirticket/:id', component: CheckPrintComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
