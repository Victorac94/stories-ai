import { AfterViewInit, Component, ElementRef, Input, OnDestroy, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-genre-thumbnail',
  templateUrl: './genre-thumbnail.component.html',
  styleUrls: ['./genre-thumbnail.component.scss']
})
export class GenreThumbnailComponent implements AfterViewInit, OnDestroy {

  @Input() genre: any = {};

  // @ViewChild('img') img: ElementRef = new ElementRef('');
  @ViewChild('imgContainer') imageContainer: ElementRef = new ElementRef('');
  @ViewChild('genreName') genreName: ElementRef = new ElementRef('');

  touchStartListener: Function = new Function();
  touchEndListener: Function = new Function();

  constructor(
    private renderer: Renderer2
  ) {

  };

  ngAfterViewInit(): void {
    // // User screen touches the image or title of the genre
    // this.touchStartListener = this.renderer.listen(this.img.nativeElement, 'touchstart', () => {
    //   this.renderer.addClass(this.img.nativeElement, 'show-box-shadow');
    // });

    // this.touchStartListener = this.renderer.listen(this.genreName.nativeElement, 'touchstart', () => {
    //   this.renderer.addClass(this.img.nativeElement, 'show-box-shadow');
    // });

    // // User stops screen touching the image or title of the genre
    // this.touchEndListener = this.renderer.listen(this.img.nativeElement, 'touchend', () => this.renderer.removeClass(this.img.nativeElement, 'show-box-shadow'));

    // this.touchEndListener = this.renderer.listen(this.genreName.nativeElement, 'touchend', () => this.renderer.removeClass(this.img.nativeElement, 'show-box-shadow'));
  }

  ngOnDestroy(): void {
    // Clean listeners
    // this.touchStartListener();
    // this.touchEndListener();
  }

  /**
   * Adds show-box-shadow CSS class
   */
  // showBoxShadow(): void {
  //   this.renderer.addClass(this.img.nativeElement, 'show-box-shadow');
  // }

  /**
   * Removes show-box-shadow CSS class
   */
  // hideBoxShadow(): void {
  //   this.renderer.removeClass(this.img.nativeElement, 'show-box-shadow');
  // }

}
