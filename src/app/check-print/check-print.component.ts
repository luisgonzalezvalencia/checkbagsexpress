import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-print',
  templateUrl: './check-print.component.html',
  styleUrls: ['./check-print.component.scss']
})
export class CheckPrintComponent implements OnInit {
  passengerName: string = 'John Doe';
  flightFrom: string = 'New York';
  flightTo: string = 'Paris';

  constructor() { }

  ngOnInit(): void {
    //obtener la maleta primero

    setTimeout(() => {
      this.print();
    }, 2000)

  }

  print(): void {
    window.print();
  }
}
