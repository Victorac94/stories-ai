import { Component, OnDestroy, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IStory } from 'src/interfaces/story';

import { diverseStories } from 'src/assets/stories/diverse_stories';
import { spaceStories } from 'src/assets/stories/space_stories';
import { horrorStories } from 'src/assets/stories/horror_stories';

import { genresIndex } from 'src/assets/utils/genres_index';
import { AuxiliaryService } from '../auxiliary.service';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.scss']
})
export class GenrePageComponent implements OnInit, AfterViewInit, OnDestroy {

  stories: IStory[] = [] as IStory[];
  genre: string = '';
  genreChangeSubscription: Subscription = new Subscription();
  genreRouteLink: string = '';

  desktopHeroImage: string = '';
  mobileHeroImage: string = '';

  isHeroImageLoaded: boolean = false;
  animating: boolean = false;

  constructor(
    private router: Router,
    private auxiliaryService: AuxiliaryService,
    private renderer2: Renderer2
  ) {

  }

  ngOnInit(): void {
    this.genreChangeSubscription = this.router.events.subscribe(e => {
      // When loading a new genre page and already being in a genre page (eg: from Horror to Space)
      if (e instanceof NavigationEnd) {
        this.isHeroImageLoaded = false;
        this.auxiliaryService.createImagePlaceholder();
        this.scrollTop();
        this.loadStories();
      }
    })

    this.scrollTop();
    this.loadStories();

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log(this.auxiliaryService.getAppContainerRef().nativeElement, this.auxiliaryService.getGenreThumbnailRef())
      this.renderer2.removeChild(this.auxiliaryService.getAppContainerRef().nativeElement, this.auxiliaryService.getGenreThumbnailRef());
    }, 200);
  }

  ngOnDestroy(): void {
    this.genreChangeSubscription.unsubscribe();
  }

  scrollTop(): void {
    window.scrollTo(0, 0);
  }

  onHeroImageLoad(): void {
    this.isHeroImageLoaded = true;
  }

  loadStories(): void {
    let genre = this.router.url.split('/')[2] // Get the genre from URL /genres/:genre/:storyId
    // this.genreEs = genre.slice(0, 1).toUpperCase() + genre.slice(1);
    let foundGenre = genresIndex.find(item => item.genre === genre);

    if (foundGenre) {
      this.genre = foundGenre.genre_es;
    } else {
      this.genre = 'Género';
    }

    switch (genre) {
      case 'space':
        this.stories = spaceStories;
        this.desktopHeroImage = 'assets/images/hero_images/space_desktop_hero.jpeg';
        this.mobileHeroImage = 'assets/images/hero_images/space_mobile_hero.jpeg';
        break;
      case 'desert':
        this.stories = diverseStories;
        this.desktopHeroImage = 'assets/images/hero_images/space_desktop_hero.jpeg';
        this.mobileHeroImage = 'assets/images/hero_images/space_mobile_hero.jpeg';
        break;
      case 'horror':
        this.stories = horrorStories;
        this.desktopHeroImage = 'assets/images/hero_images/horror_desktop_hero.jpeg';
        this.mobileHeroImage = 'assets/images/hero_images/horror_mobile_hero.jpeg';
        break;
      case 'diverse':
        this.stories = diverseStories;
        this.desktopHeroImage = 'assets/images/hero_images/diverse_desktop_hero.jpeg';
        this.mobileHeroImage = 'assets/images/hero_images/diverse_mobile_hero.jpeg';
        break;
    }
  }

  onPageTransition($event: any): void {
    this.animating = true;
  }
}
