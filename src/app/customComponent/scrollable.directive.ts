import { Directive, ElementRef, HostListener, Input, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
@Directive({
  selector: '[Scrollable]'
})
export class Scrollable {
  constructor( @Inject(DOCUMENT) private document: Document,
    private el: ElementRef) { }
  @HostListener('scroll', ['$event'])
  onScroll(event) {
    console.log("scroll");
  }
}