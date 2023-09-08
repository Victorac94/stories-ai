import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ChooseOptionComponent } from './choose-option.component';
import { ImagePlaceholderDirective } from '../directives/image-placeholder.directive';

describe('ChooseOptionComponent', () => {
  let component: ChooseOptionComponent;
  let fixture: ComponentFixture<ChooseOptionComponent>;
  let imagePlaceholderDirectiveInstance: ImagePlaceholderDirective

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseOptionComponent, ImagePlaceholderDirective]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChooseOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const imagePlaceholderDirectiveElement = fixture.debugElement.query(By.directive(ImagePlaceholderDirective));
    imagePlaceholderDirectiveInstance = imagePlaceholderDirectiveElement.injector.get(ImagePlaceholderDirective);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply ImagePlaceholderDirective correctly', () => {
    expect(imagePlaceholderDirectiveInstance).toBeDefined();
  })
});
