import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  ]

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
    const urlTree = this.router.parseUrl(this.router.url);

    // If URL does not contain a fragment hash (eg: #genres), scroll to top of the page
    if (!urlTree.fragment) {
      window.scrollTo(0, 0);
    }
  }
}
