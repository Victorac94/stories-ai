import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { IStory } from 'src/interfaces/story';

import { diverseStories } from 'src/assets/stories/diverse_stories';
import { spaceStories } from 'src/assets/stories/space_stories';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.scss']
})
export class GenrePageComponent implements OnInit, OnDestroy {

  stories: IStory[] = [] as IStory[];
  genre: string = '';
  genreChangeSubscription: Subscription = new Subscription();

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.genreChangeSubscription = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        console.log('e navigationEnd ', e);
        this.scrollTop();
        this.loadStories();
      }
    })

    this.loadStories();

  }

  ngOnDestroy(): void {
    this.genreChangeSubscription.unsubscribe();
  }

  scrollTop(): void {
    window.scrollTo(0, 0);
  }

  loadStories(): void {
    let genre = this.router.url.split('/')[2] // Get the genre from URL /genres/:genre/:storyId
    this.genre = genre.slice(0, 1).toUpperCase() + genre.slice(1);

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
