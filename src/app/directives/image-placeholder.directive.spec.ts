import { ElementRef, Renderer2 } from '@angular/core';
import { AuxiliaryService } from '../auxiliary.service';
import { ImagePlaceholderDirective } from './image-placeholder.directive';

describe('ImagePlaceholderDirective', () => {
  const elementRef = new ElementRef('');
  let renderer2: Renderer2;
  const auxiliaryService = new AuxiliaryService();

  it('should create an instance', () => {
    const directive = new ImagePlaceholderDirective(elementRef, renderer2, auxiliaryService);
    expect(directive).toBeTruthy();
  });
});
