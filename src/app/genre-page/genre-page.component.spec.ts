import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { GenrePageComponent } from './genre-page.component';
import { ImagePlaceholderDirective } from '../image-placeholder.directive';

describe('GenrePageComponent', () => {
  let component: GenrePageComponent;
  let fixture: ComponentFixture<GenrePageComponent>;
  let imagePlaceholderDirectiveInstance: ImagePlaceholderDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenrePageComponent, ImagePlaceholderDirective]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GenrePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let imagePlaceholderDirectiveElement = fixture.debugElement.query(By.directive(ImagePlaceholderDirective));
    imagePlaceholderDirectiveInstance = imagePlaceholderDirectiveElement.injector.get(ImagePlaceholderDirective);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply ImagePlaceholderDirective correctly', () => {
    expect(imagePlaceholderDirectiveInstance).toBeDefined();
  })
});
