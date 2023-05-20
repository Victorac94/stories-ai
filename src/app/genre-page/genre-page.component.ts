import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IStory } from 'src/interfaces/story';

import { invasionStories } from 'src/assets/stories/invasion_stories';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.scss']
})
export class GenrePageComponent implements OnInit {

  stories: IStory[] = [] as IStory[];

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadStories();
    // Depending on URL, load different genre stories
    // this.stories = invasionStories;

  }

  loadStories(): void {
    let genre = this.router.url.split('/')[2] // Get the genre from URL /genres/:genre/:storyId

    switch (genre) {
      case 'space':
        this.stories = invasionStories;
        break;
      case 'desert':
        this.stories = invasionStories;
        break;
      case 'marine':
        this.stories = invasionStories;
        break;
      case 'diverse':
        this.stories = invasionStories;
        break;
    }
  }
}
