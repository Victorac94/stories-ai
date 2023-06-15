import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-genre-thumbnail',
  templateUrl: './genre-thumbnail.component.html',
  styleUrls: ['./genre-thumbnail.component.scss']
})
export class GenreThumbnailComponent implements AfterViewInit {

  @Input() genre: any = {};

  @ViewChild('imgContainer') imageContainer: ElementRef = new ElementRef('');

  isThumbnailImageLoaded: boolean = false;

  constructor(
    private renderer: Renderer2
  ) {

  };

  ngAfterViewInit(): void {
    this.setThumbnailHeight();
  }

  setThumbnailHeight(): void {
    const imageContainerSibling = this.renderer.nextSibling(this.imageContainer.nativeElement);
    const imageContainerSiblingClientRect = imageContainerSibling.getBoundingClientRect();

    this.renderer.setStyle(this.imageContainer.nativeElement, 'min-height', imageContainerSiblingClientRect.width + 'px');
    this.renderer.setStyle(this.imageContainer.nativeElement, 'min-width', imageContainerSiblingClientRect.width + 'px');
  }

  onThumbnailImageLoaded(): void {
    this.isThumbnailImageLoaded = true;
  }

}
