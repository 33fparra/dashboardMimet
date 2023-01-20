import { Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'app-loading-spinner',
   templateUrl: './loading-spinner.component.html',
   styles: [],
})
export class LoadingSpinnerComponent implements OnInit {
   @Input('diameter') diameter = 40;
   @Input('label') label = 'Cargando...';

   constructor() {}

   ngOnInit(): void {}
}
