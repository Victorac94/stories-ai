import { Component, OnInit } from '@angular/core';
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
      image: 'assets/images/genre_thumbnails/space_thumbnail_genre.webp',
      link: '/genres/space'
    },
    // {
    //   name: 'Desierto',
    //   image: 'assets/images/genre_thumbnails/genre_2.webp',
    //   link: '/genres/desert'
    // },
    {
      name: 'Terror',
      image: 'assets/images/genre_thumbnails/horror_thumbnail_genre.webp',
      link: '/genres/horror'
    },
    {
      name: 'Variado',
      image: 'assets/images/genre_thumbnails/diverse_thumbnail_genre.webp',
      link: '/genres/diverse'
    },
  ];

  isHeroImageLoaded: boolean = false;
  fadeInHeroText: boolean = true;

  constructor(
    private router: Router,
    private auxiliaryService: AuxiliaryService
  ) {

  }

  ngOnInit() {
    const urlTree = this.router.parseUrl(this.router.url);

    // If URL does not contain a fragment hash (eg: #genres), scroll to top of the page
    if (!urlTree.fragment) {
      window.scrollTo(0, 0);
    }

    this.shouldFadeInHeroText();
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
}
