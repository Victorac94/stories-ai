import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appWaveBorder]'
})
export class WaveBorderDirective {

  // Element to which apply the wave border
  @Input('appWaveBorder') element: ElementRef = new ElementRef('');

  border1: any;
  border2: any;

  constructor(
    private renderer: Renderer2
  ) { }

  @HostListener('mouseenter') mouseEnter() {
    this.showWaveBorder();
  };

  @HostListener('touchstart') touchStart() {
    this.showWaveBorder();
  }

  @HostListener('mouseleave') mouseleave() {
    this.hideWaveBorder();
  }

  @HostListener('touchend') touchend() {
    this.hideWaveBorder();
  }

  showWaveBorder(): void {
    this.renderer.addClass(this.element.nativeElement, 'show-wave-border');

    // this.border1 = this.renderer.createElement('div');
    // this.border2 = this.renderer.createElement('div');

    // this.renderer.addClass(this.border1, 'wave-border');
    // this.renderer.addClass(this.border1, 'border-1');

    // this.renderer.addClass(this.border2, 'wave-border');
    // this.renderer.addClass(this.border2, 'border-2');

    // this.renderer.appendChild(this.element.nativeElement, this.border1);
    // this.renderer.appendChild(this.element.nativeElement, this.border2);
  }

  hideWaveBorder(): void {
    this.renderer.removeClass(this.element.nativeElement, 'show-wave-border');

    // const waveBorderElements = this.element.nativeElement.querySelectorAll('.wave-border');
    // console.log('waveBorder element ', waveBorderElements);

    // this.renderer.listen(waveBorderElements[waveBorderElements.length - 1], 'transitionend', () => {
    //   waveBorderElements.forEach((el: ElementRef) => {
    //     this.renderer.removeChild(this.element.nativeElement, el);
    //   })
    //   // this.renderer.removeChild(this.element.nativeElement, this.border1);
    //   // this.renderer.removeChild(this.element.nativeElement, this.border2);
    // })
  }
}
