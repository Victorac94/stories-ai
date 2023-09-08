import { Directive, ElementRef, AfterViewInit, Renderer2, OnDestroy, HostListener, Host } from '@angular/core';

@Directive({
  selector: '[appRevealText]'
})
export class RevealTextDirective implements AfterViewInit, OnDestroy {

  slider: ElementRef = new ElementRef('');
  base: ElementRef = new ElementRef('');
  elementHeight: number = 0;
  totalLines: number = 0;
  currentLine: number = 1;
  lineHeight: number = 0;
  animationUnlisten: Function = new Function();

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('click') onClick() {
    this.terminateAnimation();
  }

  ngAfterViewInit(): void {
    this.initialize();
  }

  ngOnDestroy(): void {
    // Unlisten 'animationend' event
    this.animationUnlisten();
  }

  initialize(): void {
    const hostStyles = window.getComputedStyle(this.element.nativeElement);
    const lineWidth = Number(hostStyles.width.slice(0, -2));
    this.elementHeight = Number(hostStyles.height.slice(0, -2));
    this.lineHeight = Number(hostStyles.lineHeight.slice(0, -2));
    this.totalLines = Math.ceil(this.elementHeight / this.lineHeight);

    // Create slider elements
    this.slider = this.renderer.createElement('div');
    this.base = this.renderer.createElement('div');

    this.renderer.setStyle(this.element.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.element.nativeElement, 'overflow', 'hidden');

    this.renderer.setStyle(this.slider, 'width', lineWidth * 1.4 + 'px'); // width 140% of host element
    this.renderer.setStyle(this.slider, 'height', this.lineHeight + 'px');
    this.renderer.setStyle(this.slider, 'background', 'linear-gradient(to right, transparent 0%, #1f2c3b 30%, #1f2c3b 100%)')
    this.renderer.setStyle(this.slider, 'position', 'absolute');
    this.renderer.setStyle(this.slider, 'left', `calc(-35% + ${hostStyles.paddingLeft})`);
    this.positionSlider(hostStyles, this.slider, this.base);

    this.renderer.setStyle(this.base, 'width', lineWidth + 'px');
    this.renderer.setStyle(this.base, 'height', this.lineHeight * this.totalLines - 1 + 'px');
    this.renderer.setStyle(this.base, 'background-color', '#1f2c3b');
    this.renderer.setStyle(this.base, 'position', 'absolute');
    this.renderer.setStyle(this.base, 'left', `${hostStyles.paddingLeft}px`);
    this.positionSlider(hostStyles, this.slider, this.base);

    // Add slider elements to host element
    this.renderer.appendChild(this.element.nativeElement, this.slider);
    this.renderer.appendChild(this.element.nativeElement, this.base);

    // Do animation and do it on next lines
    this.renderer.addClass(this.slider, 'slider');
    this.animationUnlisten = this.renderer.listen(this.slider, 'animationend', () => {
      this.currentLine++;

      // If we have reached the last line, remove this listener and end the animation
      if (this.currentLine > this.totalLines) {
        this.renderer.setStyle(this.slider, 'display', 'none');
        this.renderer.setStyle(this.base, 'display', 'none');
        this.animationUnlisten();
        return;
      }

      this.positionSlider(hostStyles, this.slider, this.base);
      this.renderer.removeClass(this.slider, 'slider');

      // Force reset the animation
      setTimeout(() => {
        this.renderer.addClass(this.slider, 'slider');
      }, 0);
    })
  }

  positionSlider(hostStyles: any, slider: any, base: any): void {
    this.renderer.setStyle(slider, 'top', `${Number(hostStyles.paddingTop.slice(0, -2)) + (this.lineHeight * this.currentLine - this.lineHeight)}px`); // positioned at current line
    this.renderer.setStyle(base, 'top', `${Number(hostStyles.paddingTop.slice(0, -2)) + (this.lineHeight * this.currentLine)}px`); // positioned at current line + 1 (next line)
  }

  /**
   * Hide slider elements and unlisten 'animationend' event
   */
  terminateAnimation(): void {
    this.animationUnlisten();
    this.renderer.setStyle(this.slider, 'display', 'none');
    this.renderer.setStyle(this.base, 'display', 'none');
  }
}
