import { Renderer2 } from '@angular/core'
import { WaveBorderDirective } from './directives/wave-border.directive';

describe('WaveBorderDirective', () => {
  let renderer2: Renderer2

  it('should create an instance', () => {
    const directive = new WaveBorderDirective(renderer2);
    expect(directive).toBeTruthy();
  });

  it('should show animated border on hover', () => {
    const directive = new WaveBorderDirective(renderer2);


  })
});
