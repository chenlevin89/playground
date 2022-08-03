import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {fromEvent, map} from 'rxjs';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {

  static mouseOver$ = fromEvent<MouseEvent>(document.body, 'mouseover');

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2) { }


  ngOnInit(): void {
    HighlightDirective.mouseOver$
      .pipe(
        map((event: MouseEvent) => HighlightDirective.isEventInElementRegion({event, element: this.elementRef.nativeElement}))
      )
      .subscribe(value => {
        value ?
          this.renderer.setStyle(this.elementRef.nativeElement, 'background', 'yellow') :
          this.renderer.removeStyle(this.elementRef.nativeElement, 'background');
      })
  }

  static isEventInElementRegion({event, element}: {event: MouseEvent; element: Element}): boolean {
    return element.contains(event.target as Element);
  }

}
