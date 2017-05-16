import { Component, Input } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: `
    <div class="preloader-wrapper small active" *ngIf="condition">
      <div class="spinner-layer spinner-green-only">
       <div class="circle-clipper left">
         <div class="circle"></div>
       </div><div class="gap-patch">
         <div class="circle"></div>
       </div><div class="circle-clipper right">
         <div class="circle"></div>
       </div>
      </div>
    </div>
  `
})

export class CustomLoader {

  @Input() condition: boolean;

  constructor() {

  }

}
