import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastBoxComponent } from './podcast-box.component';

describe('PodcastBoxComponent', () => {
  let component: PodcastBoxComponent;
  let fixture: ComponentFixture<PodcastBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
