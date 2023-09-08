import { AfterViewChecked, AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { IImagePlaceholderDirective } from 'src/interfaces/imagePlaceholderDirective';

import { AuxiliaryService } from '../auxiliary.service';


@Directive({
  selector: '[appImagePlaceholder]'
})
export class ImagePlaceholderDirective implements AfterViewChecked, AfterViewInit, OnDestroy {

  @Input('appImagePlaceholder') directiveConfig: Partial<IImagePlaceholderDirective> = {
    isHeroImageLoaded: false,
    isOptionAImageLoaded: false,
    isOptionBImageLoaded: false,
    isThumbnailImageLoaded: false,
    isForChooseOption: false,
    isFullWidth: false
  }

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
    this.createImagePlaceholder(this.directiveConfig.isForChooseOption, this.directiveConfig.isForThumbnail, this.directiveConfig.isFullWidth);

    // When loading a new story and already being in story page, or 
    // when loading a new genre and already being in genre page.
    this.shouldCreateImagePlaceholderSubscription = this.auxiliaryService.shouldCreateImagePlaceholder.subscribe((shouldCreate: boolean) => {
      if (shouldCreate === true && this.isImagePlaceholderCreated === false) {
        this.createImagePlaceholder(this.directiveConfig.isForChooseOption, this.directiveConfig.isForThumbnail, this.directiveConfig.isFullWidth);
      }
    })
  }

  // When image is fully loaded, we receive isHeroImageLoaded input as true
  ngAfterViewChecked(): void {
    if ((this.directiveConfig.isHeroImageLoaded === true && this.isImagePlaceholderCreated === true)
      || (this.directiveConfig.isOptionAImageLoaded === true && this.isImagePlaceholderCreated === true)
      || (this.directiveConfig.isOptionBImageLoaded === true && this.isImagePlaceholderCreated === true)
      || (this.directiveConfig.isThumbnailImageLoaded === true && this.isImagePlaceholderCreated === true)) {
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
  createImagePlaceholder(isForChooseOption: boolean = false, isForThumbnail: boolean = false, isFullWidth: boolean = false): void {
    const elementDimensions = this.element.nativeElement.getBoundingClientRect();
    const bodyElement = this.renderer.selectRootElement('body', true);
    const imagePlaceholderWave = this.renderer.createElement('div');
    this.imagePlaceholder = this.renderer.createElement('div');

    this.renderer.addClass(this.imagePlaceholder, 'image-placeholder');
    this.renderer.addClass(imagePlaceholderWave, 'image-placeholder-wave');

    // If placeholder is for the Choose Option element inside a story or for a story/genre thumbnail,
    // create the placeholder in that card and return.
    if (isForChooseOption === true || isForThumbnail === true) {
      this.renderer.appendChild(this.imagePlaceholder, imagePlaceholderWave);
      this.renderer.appendChild(this.element.nativeElement, this.imagePlaceholder);
      this.isImagePlaceholderCreated = true;

      if (isForThumbnail === true) {
        this.renderer.addClass(this.imagePlaceholder, 'thumbnail');

        if (isFullWidth === true) {
          this.renderer.addClass(this.imagePlaceholder, 'full-width');
        }
      }
      return;
    }

    // Hero desktop version. Aspect ratio 16:9
    if (bodyElement.offsetWidth > 769) {
      this.renderer.setStyle(this.imagePlaceholder, 'height', elementDimensions.width * 9 / 16 + 'px');

      // Hero mobile version. Aspect ratio 9:16
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
    this.directiveConfig.isHeroImageLoaded = false;
    this.directiveConfig.isOptionAImageLoaded = false;
    this.directiveConfig.isOptionBImageLoaded = false;
    this.directiveConfig.isThumbnailImageLoaded = false;
    this.isImagePlaceholderCreated = false;
  }

}
