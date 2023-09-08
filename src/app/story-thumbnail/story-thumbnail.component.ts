import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, HostListener } from '@angular/core';

import { IStory } from 'src/interfaces/story';
import { AuxiliaryService } from '../auxiliary.service';
import { setThumbnailWrapperDimensions } from 'src/assets/utils/set_thumbnail_wrapper_dimensions';

@Component({
  selector: 'app-story-thumbnail',
  templateUrl: './story-thumbnail.component.html',
  styleUrls: ['./story-thumbnail.component.scss']
})
export class StoryThumbnailComponent implements AfterViewInit {

  @Input() story: IStory = {} as IStory;
  @Output() pageTransition: EventEmitter<any> = new EventEmitter();

  @ViewChild('thumbnailContainer') thumbnailContainer: ElementRef = new ElementRef('');
  @ViewChild('thumbnailWrapper') thumbnailWrapper: ElementRef = new ElementRef('');

  isThumbnailImageLoaded: boolean = false;
  isAnimationShown: boolean = false;
  isDesktopVersion: boolean = false;

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
    private elementRef: ElementRef,
    private auxiliaryService: AuxiliaryService
  ) {

  }

  ngAfterViewInit(): void {
    this.isDesktopVersion = this.checkIsDesktopVersion();
    this.setThumbnailHeight();
    this.setThumbnailWrapperDimensions();
  }

  /**
   * Checks wether screen has desktop dimensions or is in landscape mode
   * 
   * @returns ``true`` of ``false``
   */
  checkIsDesktopVersion(): boolean {
    if (window.innerWidth < 992 && window.innerHeight > window.innerWidth) {
      return false;
    }
    return true;
  }

  setThumbnailHeight(): void {
    const storyTitle = this.renderer.nextSibling(this.thumbnailContainer.nativeElement); // Story title
    const storyTitleClientRect = storyTitle.getBoundingClientRect();

    // Multiplied by 0.8 because the image's dimensions are 80% of it's container's width
    this.renderer.setStyle(this.thumbnailContainer.nativeElement, 'height', storyTitleClientRect.width * 0.8 + 'px');
    this.renderer.setStyle(this.thumbnailContainer.nativeElement, 'width', storyTitleClientRect.width * 0.8 + 'px');
  }

  setThumbnailWrapperDimensions(): void {
    setThumbnailWrapperDimensions(this.thumbnailContainer.nativeElement, this.thumbnailWrapper.nativeElement, this.renderer, this.isDesktopVersion);
  }

  showImageBorder(): void {
    this.renderer.addClass(this.thumbnailContainer.nativeElement, 'show-border');
  }

  hideImageBorder(): void {
    this.renderer.removeClass(this.thumbnailContainer.nativeElement, 'show-border');
  }

  onThumbnailImageLoaded(): void {
    this.isThumbnailImageLoaded = true;

    // Remove fixed size when image is fully loaded
    // this.renderer.setStyle(this.thumbnailContainer.nativeElement, 'min-height', 'initial');
    // this.renderer.setStyle(this.thumbnailContainer.nativeElement, 'min-width', 'initial');
  }

  onAnimationEnd(): void {
    this.isAnimationShown = true;
  }

  onPageTransition($event: Event): void {
    let thumbnailRect = this.thumbnailContainer.nativeElement.getBoundingClientRect();
    let borderRadius = '50%';
    let story = {
      name: this.story.genre_es,
      name_en: this.story.genre,
      title: this.story.title,
      id: this.story.id,
      image: this.checkIsDesktopVersion() ? this.story.thumbnail_desktop : this.story.thumbnail_mobile,
      link: `/genres/${this.story.genre}/${this.story.id}`
    };

    if (this.isAnimationShown === true) {
      // thumbnailRect = this.thumbnailContainer.nativeElement.getBoundingClientRect();
      borderRadius = '1rem';

    } else {
      // thumbnailRect = this.thumbnailContainer.nativeElement.getBoundingClientRect();
    }


    this.auxiliaryService.setStoryThumbnailData({
      top: thumbnailRect.top,
      left: thumbnailRect.left,
      width: thumbnailRect.width,
      height: thumbnailRect.height,
      imgSrc: this.checkIsDesktopVersion() ? this.story.thumbnail_desktop : this.story.thumbnail_mobile,
      borderRadius: borderRadius,
      storyData: story,
      elementRef: this.elementRef
    });

    this.pageTransition.emit(story);
  }
}