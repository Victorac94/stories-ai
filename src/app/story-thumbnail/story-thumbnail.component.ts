import { Component, Input } from '@angular/core';
import { IStory } from 'src/interfaces/story';

@Component({
  selector: 'app-story-thumbnail',
  templateUrl: './story-thumbnail.component.html',
  styleUrls: ['./story-thumbnail.component.scss']
})
export class StoryThumbnailComponent {

  @Input() story: IStory = {} as IStory;

}