import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, ViewChild } from '@angular/core';

import { AuxiliaryService } from '../auxiliary.service';
import { setThumbnailHeight } from 'src/assets/utils/set_thumbnail_height';
import { setThumbnailWrapperDimensions } from 'src/assets/utils/set_thumbnail_wrapper_dimensions';

@Component({
  selector: 'app-genre-thumbnail',
  templateUrl: './genre-thumbnail.component.html',
  styleUrls: ['./genre-thumbnail.component.scss']
})
export class GenreThumbnailComponent implements AfterViewInit {

  @Input() genre: any = {};
  @Output() pageTransition: EventEmitter<any> = new EventEmitter();

  @ViewChild('thumbnailContainer') thumbnailContainer: ElementRef = new ElementRef('');
  @ViewChild('thumbnailWrapper') thumbnailWrapper: ElementRef = new ElementRef('');
  @ViewChild('thumbnailImage') thumbnailImage: ElementRef = new ElementRef('');
  @ViewChild('genreName') genreName: ElementRef = new ElementRef('');

  isThumbnailImageLoaded: boolean = false;
  isDesktopVersion: boolean = false;
  isAnimationShown: boolean = false;

  @HostListener('window:resize') windowResize() {
    // If screen has changed from 'mobile' to 'desktop' dimensions or from 'portrait' to 'landscape' or viceversa
    if (this.isDesktopVersion !== this.checkIsDesktopVersion()) {
      this.isDesktopVersion = !this.isDesktopVersion;

      this.setThumbnailHeight();
      this.setThumbnailWrapperDimensions();
    }
  }

  constructor(
    private renderer: Renderer2,
    private auxiliaryService: AuxiliaryService,
    private elementRef: ElementRef
  ) {

  };

  ngAfterViewInit(): void {
    this.isDesktopVersion = this.checkIsDesktopVersion();
    this.setThumbnailHeight();
    this.setThumbnailWrapperDimensions();
  }

  /**
   * Checks wether screen has desktop dimensions or screen is in landscape mode
   * 
   * @returns ``true`` of ``false``
   */
  checkIsDesktopVersion(): boolean {
    if (window.innerWidth < 992 && window.innerHeight > window.innerWidth) {
      return false;
    }
    return true;
  }

  /**
   * On thumbnail hover or touchstart, show preview animation
   */
  onThumbnailHover(): void {
    this.renderer.addClass(this.thumbnailContainer.nativeElement, 'on-hover-thumbnail');
  }

  /**
   * On thumbnail Unhover or touchend, hide preview animation
   */
  onThumbnailUnhover(): void {
    this.renderer.removeClass(this.thumbnailContainer.nativeElement, 'on-hover-thumbnail');
    this.isAnimationShown = false;
  }

  /**
   * Set width and height of thumbnailContainer to same value of genreName's width (making thumbnailContainer a square)
   */
  setThumbnailHeight(): void {
    setThumbnailHeight(this.genreName.nativeElement, this.thumbnailContainer.nativeElement, this.renderer);
    // const genreNameClientRect = this.genreName.nativeElement.getBoundingClientRect();

    // this.renderer.setStyle(this.thumbnailContainer.nativeElement, 'height', genreNameClientRect.width + 'px');
    // this.renderer.setStyle(this.thumbnailContainer.nativeElement, 'width', genreNameClientRect.width + 'px');
  }

  /**
   * When thumbnail image is fully loaded, set corresponding flag
   */
  onThumbnailImageLoaded(): void {
    this.isThumbnailImageLoaded = true;

    // Remove fixed size when thumbnail image is fully loaded
    // this.renderer.setStyle(this.thumbnailContainer.nativeElement, 'min-height', 'initial');
    // this.renderer.setStyle(this.thumbnailContainer.nativeElement, 'min-width', 'initial');
  }

  /**
   * Set thumbnail wrapper width and height to those of thumbnail image
   */
  setThumbnailWrapperDimensions(): void {
    setThumbnailWrapperDimensions(this.thumbnailContainer.nativeElement, this.thumbnailWrapper.nativeElement, this.renderer, this.isDesktopVersion);
    // let thumbnailHeight = 0;
    // let thumbnailWidth = 0;

    // // We need to get width from height and viceversa this way because on view initialization one of those properties is 0 (the one set to 'auto' on css) when we try to access it with the properties 'clientWidth' or 'clientHeight'
    // if (this.isDesktopVersion) {
    //   thumbnailHeight = this.thumbnailContainer.nativeElement.clientHeight;
    //   thumbnailWidth = thumbnailHeight * 16 / 9; // Desktop version has thumbnails with 16:9 aspect ratio
    // } else {
    //   thumbnailWidth = this.thumbnailContainer.nativeElement.clientWidth;
    //   thumbnailHeight = thumbnailWidth * 16 / 9; // Non desktop version has thumbnails with 9:16 aspect ratio
    // }

    // console.log(thumbnailHeight, thumbnailWidth);

    // this.renderer.setStyle(this.thumbnailWrapper.nativeElement, 'width', thumbnailWidth + 'px');
    // this.renderer.setStyle(this.thumbnailWrapper.nativeElement, 'height', thumbnailHeight + 'px');
  }

  onAnimationEnd(): void {
    this.isAnimationShown = true;
  }

  onPageTransition($event: Event): void {
    let thumbnailRect = null;
    let borderRadius = '50%';

    if (this.isAnimationShown === true) {
      thumbnailRect = this.thumbnailWrapper.nativeElement.getBoundingClientRect();
      borderRadius = '1rem';

    } else {
      thumbnailRect = this.thumbnailContainer.nativeElement.getBoundingClientRect();
    }


    this.auxiliaryService.setGenreThumbnailData({
      top: thumbnailRect.top,
      left: thumbnailRect.left,
      width: thumbnailRect.width,
      height: thumbnailRect.height,
      imgSrc: this.genre.image,
      borderRadius: borderRadius,
      genreData: this.genre,
      elementRef: this.elementRef
    });

    this.pageTransition.emit(this.genre);
  }

}
