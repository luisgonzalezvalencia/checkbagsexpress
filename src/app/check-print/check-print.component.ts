import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-check-print',
  templateUrl: './check-print.component.html',
  styleUrls: ['./check-print.component.scss']
})
export class CheckPrintComponent implements OnInit, AfterViewInit {
  passengerName: string = 'John Doe';
  flightFrom: string = 'New York';
  flightTo: string = 'Paris';

  @ViewChild('barcode1', { static: true }) barcode1!: ElementRef;
  @ViewChild('barcode2', { static: true }) barcode2!: ElementRef;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.print();
    }, 3000);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.generateBarcodes();
    }, 0);
  }

  generateBarcodes(): void {
    JsBarcode(this.barcode1.nativeElement, 'barcode-value-1', {
      format: 'CODE128',
      displayValue: true,
      width: 2,
      height: 40
    });

    JsBarcode(this.barcode2.nativeElement, 'barcode-value-2', {
      format: 'CODE128',
      displayValue: true,
      width: 2,
      height: 40
    });
  }

  print(): void {
    window.print();
  }
}
