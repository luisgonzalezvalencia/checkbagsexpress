import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CheckMaletaComponent } from './check-maleta/check-maleta.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'checkmaleta/:id', component: CheckMaletaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
