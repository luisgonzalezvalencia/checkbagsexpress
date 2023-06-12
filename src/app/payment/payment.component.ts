import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public amount: number = 10000; // Valor pre-cargado para el monto
  itemDescription: string = '3kg adicionales en valija'; // Valor pre-cargado para la descripción del artículo
  cardNumber: string = '';
  expirationDate: string = '';

  idMaleta: string = '';
  idPasaje: string = '';
  peso: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let str = this.activatedRoute.snapshot.params['id'];
    if (this.activatedRoute.snapshot.params['id'].includes("pje-")) {
      // Obtener el valor entre 'pje-' y '-peso'
      this.idPasaje = str.split('pje-')[1].split('-peso')[0];
    } else {
      this.idMaleta = this.activatedRoute.snapshot.params['id'];
    }
    // Obtener el valor después de '-peso-'
    this.peso = str.split('-peso-')[1];
    this.amount = this.obtenerMonto();
    this.itemDescription = this.obtenerDescription();
  }

  applyCardNumberMask() {
    let trimmed = this.cardNumber.replace(/\s+/g, '');
    if (trimmed.length > 16) {
      trimmed = trimmed.substring(0, 16);
    }
    let masked = '';
    for (let i = 0; i < trimmed.length; i++) {
      if (i > 0 && i % 4 === 0) {
        masked += ' ';
      }
      masked += trimmed[i];
    }
    this.cardNumber = masked;
  }

  preventNonNumericInput(event: any) {
    const key = event.keyCode || event.which;
    if (key !== 8 && key !== 46 && (key < 48 || key > 57)) {
      event.preventDefault();
    }
  }

  applyExpirationDateMask() {
    let trimmed = this.getExpirationDateWithoutMask();
    let masked = '';
    for (let i = 0; i < trimmed.length; i++) {
      console.log(i);
      if (i === 2 && trimmed.length > 2) {
        masked += '/';
      }
      if (i < 2 || (i >= 2 && trimmed.length > 2)) {
        masked += trimmed[i];
      }
    }
    this.expirationDate = masked.substring(0, 5);
  }

  getExpirationDateWithoutMask() {
    return this.expirationDate.replace(/\//g, '');
  }

  confirmarPago() {
    //actualizar la compra del pasaje y registrar la maleta
    this.router.navigate(['imprimirticket', this.idMaleta]);
  }

  obtenerMonto() {
    let pesoD = parseFloat(this.peso);
    if (pesoD < 20) {
      return 3500;
    }

    if (pesoD < 25) {
      return 5500;
    }

    if (pesoD < 30) {
      return 7500;
    }

    return 9000;
  }

  obtenerDescription() {
    let pesoD = parseFloat(this.peso);
    if (pesoD < 20) {
      return "Equipaje adicional de 12 KG";
    }

    if (pesoD < 25) {
      return "Equipaje adicional de 20 KG";
    }

    if (pesoD < 30) {
      return "Equipaje adicional de 25 KG";
    }

    return "Equipaje adicional de 30 KG";

  }

}
