import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFilteringComponent } from './page-filtering.component';

describe('PageFilteringComponent', () => {
  let component: PageFilteringComponent;
  let fixture: ComponentFixture<PageFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFilteringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
