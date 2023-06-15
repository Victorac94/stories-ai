import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IStory } from 'src/interfaces/story';

@Component({
  selector: 'app-story-thumbnail',
  templateUrl: './story-thumbnail.component.html',
  styleUrls: ['./story-thumbnail.component.scss']
})
export class StoryThumbnailComponent implements AfterViewInit {

  @Input() story: IStory = {} as IStory;

  @ViewChild('imgContainer') imageContainer: ElementRef = new ElementRef('');

  isThumbnailImageLoaded: boolean = false;

  constructor(
    private renderer: Renderer2
  ) {

  }

  @HostListener('window:resize') onScreenResize() {
    this.setThumbnailHeight();
  }

  ngAfterViewInit(): void {
    this.setThumbnailHeight();
  }

  setThumbnailHeight(): void {
    const imageContainerSibling = this.renderer.nextSibling(this.imageContainer.nativeElement);
    const imageContainerSiblingClientRect = imageContainerSibling.getBoundingClientRect();

    this.renderer.setStyle(this.imageContainer.nativeElement, 'min-height', imageContainerSiblingClientRect.width * 0.8 + 'px'); // multiplied by 0.8 because the image's width is 80% of it's container's width
    this.renderer.setStyle(this.imageContainer.nativeElement, 'min-width', imageContainerSiblingClientRect.width + 'px');
  }

  showImageBorder(): void {
    this.renderer.addClass(this.imageContainer.nativeElement, 'show-border');
  }

  hideImageBorder(): void {
    this.renderer.removeClass(this.imageContainer.nativeElement, 'show-border');
  }

  onThumbnailImageLoaded(): void {
    this.isThumbnailImageLoaded = true;
  }
}