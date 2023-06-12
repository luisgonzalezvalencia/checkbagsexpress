import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public amount: number = 10000; // Valor pre-cargado para el monto
  itemDescription: string = '3kg adicionales en valija'; // Valor pre-cargado para la descripción del artículo

  constructor() { }

  ngOnInit(): void {
  }

}
