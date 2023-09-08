import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IImageRepositionDirective } from 'src/interfaces/imageReposition';

import { AuxiliaryService } from '../auxiliary.service';


@Directive({
  selector: '[appImageReposition]'
})
export class ImageRepositionDirective implements AfterViewInit, OnDestroy {


  @Input('appImageReposition') config: Partial<IImageRepositionDirective> = {
    destinationElementRef: null,
    toGenrePage: false,
    toStoryPage: false
  }

  @HostListener('window:resize') onScreenResize() {
    this.appContainer = this.auxiliaryService.getAppContainerRef();
  }

  appContainer: ElementRef = new ElementRef('');
  appHeader: ElementRef = new ElementRef('');
  finalPosition: any = {}

  genreThumbnailDataSubscription: Subscription = new Subscription();
  storyThumbnailDataSubscription: Subscription = new Subscription();

  constructor(
    private auxiliaryService: AuxiliaryService,
    private renderer2: Renderer2,
    private router: Router,
    private elementRef: ElementRef
  ) {
    this.appContainer = this.auxiliaryService.getAppContainerRef();
    this.appHeader = this.auxiliaryService.getAppHeaderRef();

    // If config is badly configured through input, set config as if starting image element was a genre thumbnail
    if ((this.config.toGenrePage === false && this.config.toStoryPage === false) ||
      (this.config.toGenrePage === true && this.config.toStoryPage === true)) {
      this.config = {
        ...this.config,
        toGenrePage: true,
        toStoryPage: false
      }
    }
  }

  ngAfterViewInit(): void {

    // Navigating to genre page
    this.genreThumbnailDataSubscription = this.auxiliaryService.genreThumbnailDataSubject.subscribe((data: any) => {
      // Execute only on the clicked thumbnail (clicked image-reposition.directive), instead of once per rendered thumbnail (rendered directive)
      if (data.elementRef.nativeElement === this.elementRef.nativeElement) {
        this.setRepositionImageDimensions(data);
        this.initializeImageRepositionAnimation(data);
      }
    });

    // Navigating to story page
    this.storyThumbnailDataSubscription = this.auxiliaryService.storyThumbnailDataSubject.subscribe((data: any) => {
      // Execute only on the clicked thumbnail (clicked image-reposition.directive), instead of once per rendered thumbnail (rendered directive)
      if (data.elementRef.nativeElement === this.elementRef.nativeElement) {
        this.setRepositionImageDimensions(data);
        this.initializeImageRepositionAnimation(data);
      }
    });
  }

  ngOnDestroy(): void {
    this.genreThumbnailDataSubscription.unsubscribe();
    this.storyThumbnailDataSubscription.unsubscribe();
  }

  setRepositionImageDimensions(data: any): void {
    /* Genre page */
    if (this.config.toGenrePage === true) {
      // Mobile, tablet, portrait mode
      this.finalPosition = {
        imgFinalWidth: this.appContainer.nativeElement.clientWidth,
      };

      /* Story page */
    } else {
      let imgFinalWidth = Math.min(1200, this.appContainer.nativeElement.clientWidth);
      let imgFinalXpos = 0; // We have to calculate it later when we know the initial width of the image
      const html = window.getComputedStyle(document.getElementsByTagName('html')[0]);
      const regex = /([0-9\.]+)/; // Get the number, removing the unit ('rem', 'px') from the string

      let imgFinalYpos = Number(regex.exec(html.fontSize)![0]) * (Number(regex.exec(html.getPropertyValue('--story-container-padding-top'))![0]) + Number(regex.exec(html.getPropertyValue('--story-title-font-size'))![0]) + (Number(regex.exec(html.getPropertyValue('--story-title-padding-top-bottom'))![0])) * 2);

      // // Mobile, tablet. Screen width less than 1200px
      // if (this.appContainer.nativeElement.clientWidth < 1200) {
      //   imgFinalWidth = this.appContainer.nativeElement.clientWidth;

      //   // PC and screen width more than 1200px
      // } else {
      //   imgFinalWidth = 1200; // Fixed size. Max image width is 1200px
      // }

      // imgFinalWidth = Math.min(1200, this.appContainer.nativeElement.clientWidth);

      this.finalPosition = {
        imgFinalWidth,
        imgFinalXpos,
        imgFinalYpos
      }
    }
  }

  initializeImageRepositionAnimation(data: any): void {
    // Initialize image position and size
    const imgContainer = this.renderer2.createElement('div');
    const img = this.renderer2.createElement('img');
    this.renderer2.setStyle(imgContainer, 'display', 'flex');
    this.renderer2.setStyle(imgContainer, 'justify-content', 'center');
    this.renderer2.setStyle(imgContainer, 'align-items', 'center');
    this.renderer2.setStyle(imgContainer, 'width', data.width + 'px');
    this.renderer2.setStyle(imgContainer, 'height', data.height + 'px');
    this.renderer2.setStyle(imgContainer, 'border-radius', data.borderRadius);
    this.renderer2.setStyle(imgContainer, 'overflow', 'hidden');
    this.renderer2.setStyle(imgContainer, 'position', 'fixed');
    this.renderer2.setStyle(imgContainer, 'top', data.top + 'px');
    this.renderer2.setStyle(imgContainer, 'left', data.left + 'px');
    this.renderer2.setStyle(imgContainer, 'z-index', '10');
    this.renderer2.setProperty(img, 'src', data.imgSrc);
    this.renderer2.setProperty(img, 'position', 'absolute');

    // Mobile portrait, tablet portrait
    if (this.appContainer.nativeElement.clientWidth < 992 && this.appContainer.nativeElement.clientWidth < this.appContainer.nativeElement.clientHeight) {
      this.renderer2.setStyle(img, 'width', '100%');
      this.renderer2.setStyle(img, 'height', 'auto');

      // Mobile landscape, tablet landscape, desktop
    } else {
      this.renderer2.setStyle(img, 'width', 'auto');
      this.renderer2.setStyle(img, 'height', '100%');
    }

    this.renderer2.appendChild(imgContainer, img);
    this.renderer2.insertBefore(this.appContainer.nativeElement, imgContainer, this.appHeader.nativeElement);

    // Move image to final position. setTimeout() to force a re-render and have access to .getBoundingClientRect() and other methods
    setTimeout(() => {
      const imgClientRect = img.getBoundingClientRect();
      const imgInitialXposition = imgClientRect.left;
      const imgFinalXposition = (this.appContainer.nativeElement.clientWidth / 2) - (img.clientWidth / 2) - ((img.clientWidth - imgContainer.clientWidth) / 2);
      const imgInitialWidth = imgClientRect.width;
      const imgFinalWidth = this.finalPosition.imgFinalWidth;
      const imgScale = imgFinalWidth / imgInitialWidth;

      const imgInitialYposition = imgClientRect.bottom;
      const imgFinalHeight = imgClientRect.height * imgScale;
      let imgFinalYposition = imgFinalHeight - ((img.clientHeight - imgContainer.clientHeight) / 2);

      if (this.config.toStoryPage === true) {
        imgFinalYposition += this.finalPosition.imgFinalYpos;
        console.log('executing to story page ', imgFinalHeight, this.finalPosition.imgFinalYpos, imgFinalYposition);
      }

      this.finalPosition.imgFinalXpos = imgFinalXposition;
      this.finalPosition.imgFinalYpos = Number(window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize) * this.finalPosition.imgFinalYpos; // Convert from rem units to px

      // this.renderer2.setStyle(imgContainer, 'transition', 'transform 500ms ease-out, width 500ms ease-out, height 500ms ease-out, border-radius 500ms ease-out, opacity 500ms 500ms ease-out');
      this.renderer2.setStyle(imgContainer, 'transition', 'transform 500ms ease-out, width 500ms ease-out, height 500ms ease-out, border-radius 500ms ease-out');
      this.renderer2.setStyle(imgContainer, 'transform-origin', 'bottom');
      this.renderer2.setStyle(imgContainer, 'transform', `translate(${imgFinalXposition - imgInitialXposition}px, ${imgFinalYposition - imgInitialYposition}px) scale(${imgScale})`);
      this.renderer2.setStyle(imgContainer, 'border-radius', '0');
      // this.renderer2.setStyle(imgContainer, 'width', this.finalPosition.clientWidth / imgScale + 'px');
      this.renderer2.setStyle(imgContainer, 'width', this.finalPosition.imgFinalWidth / imgScale + 'px');
      this.renderer2.setStyle(imgContainer, 'height', img.clientHeight + 'px');
      // this.renderer2.setStyle(imgContainer, 'opacity', '0');

      const transitionListener = this.renderer2.listen(imgContainer, 'transitionend', () => {
        console.log('transition end')
        this.auxiliaryService.setAppContainerRef(this.appContainer);

        if (this.config.toGenrePage === true) {
          this.auxiliaryService.setGenreThumbnailRef(imgContainer);
          this.router.navigateByUrl(data.genreData.link);
        } else {
          this.auxiliaryService.setStoryThumbnailRef(imgContainer);
          this.router.navigateByUrl(data.storyData.link);
        }

        // Unlisten 'transitionend' event
        transitionListener();
      })
    }, 0);
  }
}