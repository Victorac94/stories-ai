import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { IStory } from 'src/interfaces/story';

@Component({
  selector: 'app-story-thumbnail',
  templateUrl: './story-thumbnail.component.html',
  styleUrls: ['./story-thumbnail.component.scss']
})
export class StoryThumbnailComponent {

  @Input() story: IStory = {} as IStory;

  @ViewChild('imgContainer') imageContainer: ElementRef = new ElementRef('');

  constructor(
    private renderer: Renderer2
  ) {

  }

  showImageBorder(): void {
    this.renderer.addClass(this.imageContainer.nativeElement, 'show-border');
  }

  hideImageBorder(): void {
    this.renderer.removeClass(this.imageContainer.nativeElement, 'show-border');
  }
}