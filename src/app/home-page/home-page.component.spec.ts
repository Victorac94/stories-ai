import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { HomePageComponent } from './home-page.component';
import { ImagePlaceholderDirective } from '../image-placeholder.directive';
import { GenreThumbnailComponent } from '../genre-thumbnail/genre-thumbnail.component';
import { WaveBorderDirective } from '../wave-border.directive';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let imagePlaceholderDirectiveInstance: ImagePlaceholderDirective;
  let waveBoderDirectiveInstance: WaveBorderDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent, GenreThumbnailComponent, ImagePlaceholderDirective, WaveBorderDirective],
      imports: [RouterTestingModule.withRoutes([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const imagePlaceholderDirectiveElement = fixture.debugElement.query(By.directive(ImagePlaceholderDirective));
    imagePlaceholderDirectiveInstance = imagePlaceholderDirectiveElement.injector.get(ImagePlaceholderDirective);

    let waveBorderDirectiveElement = fixture.debugElement.query(By.directive(WaveBorderDirective));
    waveBoderDirectiveInstance = waveBorderDirectiveElement.injector.get(WaveBorderDirective);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply ImagePlaceholderDirective correctly', () => {
    expect(imagePlaceholderDirectiveInstance).toBeDefined();
  })

  it('should apply WaveBorderDirective correctly', () => {
    expect(waveBoderDirectiveInstance).toBeDefined();
  })

  it('should show correct genres', () => {
    expect(component.genres).toEqual([
      {
        name: 'Espacio',
        image: 'assets/images/genre_thumbnails/space_thumbnail_genre.webp',
        link: '/genres/space'
      },
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
    ])
  })
});
