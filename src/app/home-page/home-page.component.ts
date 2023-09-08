import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuxiliaryService } from '../auxiliary.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  genres: any[] = [
    {
      name: 'Espacio',
      name_en: 'space',
      image: `assets/images/hero_images/space_mobile_hero.jpeg`,
      link: '/genres/space'
    },
    // {
    //   name: 'Desierto',
    //   name_en: 'desert',
    //   image: 'assets/images/hero_images/desert_mobile_hero.webp',
    //   link: '/genres/desert'
    // },
    {
      name: 'Terror',
      name_en: 'horror',
      image: `assets/images/hero_images/horror_mobile_hero.jpeg`,
      link: '/genres/horror'
    },
    {
      name: 'Variado',
      name_en: 'diverse',
      image: `assets/images/hero_images/diverse_mobile_hero.jpeg`,
      link: '/genres/diverse'
    },
  ];

  isHeroImageLoaded: boolean = false;
  fadeInHeroText: boolean = true;
  animating: boolean = false;
  genreRouteLink: string = '';
  appHeader: ElementRef = new ElementRef('');

  constructor(
    private router: Router,
    private auxiliaryService: AuxiliaryService
  ) {
    this.appHeader = this.auxiliaryService.getAppHeaderRef();
  }

  @ViewChild('container', { static: true }) container: ElementRef = new ElementRef('');

  @HostListener('window:resize') onWindowResize() {
    this.loadGenresThumbnail();
  }

  ngOnInit() {
    const urlTree = this.router.parseUrl(this.router.url);

    // If URL does not contain a fragment hash (eg: #genres), scroll to top of the page
    if (!urlTree.fragment) {
      window.scrollTo(0, 0);
    }

    this.shouldFadeInHeroText();
    this.loadGenresThumbnail();
  }

  loadGenresThumbnail(): void {
    // Mobile viewport
    if (this.container.nativeElement.clientWidth < 992 && this.container.nativeElement.clientWidth < window.innerHeight) {
      this.genres.forEach(genre => {
        genre.image = `assets/images/hero_images/${genre.name_en}_mobile_hero.jpeg`;
      });
      // Desktop viewport
    } else {
      this.genres.forEach(genre => {
        genre.image = `assets/images/hero_images/${genre.name_en}_desktop_hero.jpeg`;
      });
    }
  }

  onHeroImageLoad(): void {
    this.isHeroImageLoaded = true;
  }

  shouldFadeInHeroText(): void {
    if (this.auxiliaryService.shouldFadeInHomeHeroText === true) {
      this.fadeInHeroText = true;
      this.auxiliaryService.shouldFadeInHomeHeroText = false;
    } else {
      this.fadeInHeroText = false;
    }
  }

  onPageTransition($event: any): void {
    this.animating = true;
  }
}
