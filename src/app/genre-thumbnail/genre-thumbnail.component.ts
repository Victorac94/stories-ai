import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-genre-thumbnail',
  templateUrl: './genre-thumbnail.component.html',
  styleUrls: ['./genre-thumbnail.component.scss']
})
export class GenreThumbnailComponent {

  @Input() genre: any = {};

}
