import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],

})
export class InicioComponent implements OnInit {

  public boardingPass: string = '';
  constructor() { }

  ngOnInit(): void {
    document.getElementById('boarding-code')?.focus();
  }

}
