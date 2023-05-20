import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreThumbnailComponent } from './genre-thumbnail.component';

describe('GenreThumbnailComponent', () => {
  let component: GenreThumbnailComponent;
  let fixture: ComponentFixture<GenreThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreThumbnailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
