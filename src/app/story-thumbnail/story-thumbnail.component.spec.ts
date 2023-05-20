import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryThumbnailComponent } from './story-thumbnail.component';

describe('StoryThumbnailComponent', () => {
  let component: StoryThumbnailComponent;
  let fixture: ComponentFixture<StoryThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryThumbnailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
