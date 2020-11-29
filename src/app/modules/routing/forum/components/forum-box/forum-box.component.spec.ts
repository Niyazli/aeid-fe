import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumBoxComponent } from './forum-box.component';

describe('ForumBoxComponent', () => {
  let component: ForumBoxComponent;
  let fixture: ComponentFixture<ForumBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
