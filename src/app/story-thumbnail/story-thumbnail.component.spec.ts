import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { StoryThumbnailComponent } from './story-thumbnail.component';
import { ImagePlaceholderDirective } from '../image-placeholder.directive';
import { WaveBorderDirective } from '../wave-border.directive';

describe('StoryThumbnailComponent', () => {
  let component: StoryThumbnailComponent;
  let fixture: ComponentFixture<StoryThumbnailComponent>;
  let imagePlaceholderDirectiveInstance: ImagePlaceholderDirective;
  let waveBorderDirectiveInstance: WaveBorderDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoryThumbnailComponent, ImagePlaceholderDirective, WaveBorderDirective],
      imports: [RouterTestingModule.withRoutes([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StoryThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const imagePlaceholderDirectiveElement = fixture.debugElement.query(By.directive(ImagePlaceholderDirective));
    imagePlaceholderDirectiveInstance = imagePlaceholderDirectiveElement.injector.get(ImagePlaceholderDirective);

    const waveBorderDirectiveElement = fixture.debugElement.query(By.directive(WaveBorderDirective));
    waveBorderDirectiveInstance = waveBorderDirectiveElement.injector.get(WaveBorderDirective);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply ImagePlaceHolderDirective correctly', () => {
    expect(imagePlaceholderDirectiveInstance).toBeDefined();
  });

  it('should apply WaveBorderDirective correctly', () => {
    expect(waveBorderDirectiveInstance).toBeDefined();
  })
});
