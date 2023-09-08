import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { GenreThumbnailComponent } from './genre-thumbnail.component';
import { ImagePlaceholderDirective } from '../directives/image-placeholder.directive';
import { WaveBorderDirective } from '../directives/wave-border.directive';
import { DebugElement } from '@angular/core';

describe('GenreThumbnailComponent', () => {
  let component: GenreThumbnailComponent;
  let fixture: ComponentFixture<GenreThumbnailComponent>;
  let imagePlaceholderDirectiveInstance: ImagePlaceholderDirective;
  let waveBorderDirectiveInstance: WaveBorderDirective;

  // let waveBorderContainer: DebugElement;
  // let waveBorderContainerInstance: WaveBorderDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenreThumbnailComponent, ImagePlaceholderDirective, WaveBorderDirective],
      imports: [RouterTestingModule.withRoutes([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GenreThumbnailComponent);
    component = fixture.componentInstance;

    const imagePlaceholderDirectiveElement = fixture.debugElement.query(By.directive(ImagePlaceholderDirective));
    imagePlaceholderDirectiveInstance = imagePlaceholderDirectiveElement.injector.get(ImagePlaceholderDirective);

    const waveBorderDirectiveElement = fixture.debugElement.query(By.directive(WaveBorderDirective));
    waveBorderDirectiveInstance = waveBorderDirectiveElement.injector.get(WaveBorderDirective);

    // waveBorderContainer = fixture.debugElement.nativeElement.querySelector('.wave-border-container');
    // waveBorderContainer = fixture.debugElement.query(By.directive(WaveBorderDirective));
    // waveBorderContainerInstance = waveBorderContainer.injector.get(WaveBorderDirective);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply ImagePlaceholderDirective correctly', () => {
    expect(imagePlaceholderDirectiveInstance).toBeDefined();
  });

  it('should apply WaveBorderDirective correctly', () => {
    expect(waveBorderDirectiveInstance).toBeDefined();
  })

  // it('should add wave border classes on hover', () => {
  //   spyOn(waveBorderContainer, 'showWaveBorder')
  //   waveBorderContainer.triggerEventHandler('mouseenter', null);
  //   // waveBorderContainer.dispatchEvent(new Event('mouseenter'));
  //   fixture.detectChanges();
  //   expect(waveBorderDirectiveInstance.showWaveBorder).toHaveBeenCalled()
  //   console.log(waveBorderContainer.nativeElement.classList);
  //   // expect(waveBorderContainer.classList.contains('show-wave-border')).toBe(true);
  // })
});
