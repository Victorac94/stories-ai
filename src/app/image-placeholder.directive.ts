import { AfterViewChecked, AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { AuxiliaryService } from './auxiliary.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appImagePlaceholder]'
})
export class ImagePlaceholderDirective implements AfterViewChecked, AfterViewInit, OnDestroy {

  @Input('appImagePlaceholder') imgLoaded: boolean = false;

  imagePlaceholder: ElementRef = new ElementRef('');
  isImagePlaceholderCreated: boolean = false;
  shouldCreateImagePlaceholderSubscription: Subscription = new Subscription();

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private auxiliaryService: AuxiliaryService
  ) {
  }

  ngAfterViewInit(): void {
    this.createImagePlaceholder();

    this.shouldCreateImagePlaceholderSubscription = this.auxiliaryService.shouldCreateImagePlaceholder.subscribe((shouldCreate: boolean) => {
      if (shouldCreate === true) {
        this.createImagePlaceholder();
      }
    })
  }

  // When image is fully loaded, we receive imgLoaded input as true
  ngAfterViewChecked(): void {
    if (this.imgLoaded === true && this.isImagePlaceholderCreated) {
      this.hideImagePlaceholder();
    }
  }

  ngOnDestroy(): void {
    this.shouldCreateImagePlaceholderSubscription.unsubscribe();
  }

  /**
   * Creates a background image placeholder to show while image is still loading
   * to avoid layout reflow
   */
  createImagePlaceholder(): void {
    const elementDimensions = this.element.nativeElement.getBoundingClientRect();
    const bodyElement = this.renderer.selectRootElement('body', true);
    const imagePlaceholderWave = this.renderer.createElement('div');
    this.imagePlaceholder = this.renderer.createElement('div');

    this.renderer.addClass(this.imagePlaceholder, 'image-placeholder');
    // this.renderer.setProperty(this.imagePlaceholder, 'innerText', 'Cargando imagen...');
    this.renderer.addClass(imagePlaceholderWave, 'image-placeholder-wave');

    // Desktop version. Aspect ratio 16:9
    if (bodyElement.offsetWidth > 769) {
      this.renderer.setStyle(this.imagePlaceholder, 'height', elementDimensions.width * 9 / 16 + 'px');

      // Mobile version. Aspect ratio 9:16
    } else {
      this.renderer.setStyle(this.imagePlaceholder, 'height', elementDimensions.width * 16 / 9 + 'px');
    }

    this.renderer.appendChild(this.imagePlaceholder, imagePlaceholderWave);
    this.renderer.appendChild(this.element.nativeElement, this.imagePlaceholder);
    this.isImagePlaceholderCreated = true;
  }

  /**
   * When image is fully loaded, remove background image placeholder
   */
  hideImagePlaceholder(): void {
    this.renderer.removeChild(this.element.nativeElement, this.imagePlaceholder, false);
    this.imgLoaded = false;
    this.isImagePlaceholderCreated = false;
  }

}
