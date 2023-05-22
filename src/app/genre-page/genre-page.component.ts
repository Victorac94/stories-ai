import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IStory } from 'src/interfaces/story';

import { diverseStories } from 'src/assets/stories/diverse_stories';
import { spaceStories } from 'src/assets/stories/space_stories';

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
    // this.stories = diverseStories;

  }

  loadStories(): void {
    let genre = this.router.url.split('/')[2] // Get the genre from URL /genres/:genre/:storyId

    switch (genre) {
      case 'space':
        this.stories = spaceStories;
        break;
      case 'desert':
        this.stories = diverseStories;
        break;
      case 'terror':
        this.stories = diverseStories;
        break;
      case 'diverse':
        this.stories = diverseStories;
        break;
    }
  }
}
