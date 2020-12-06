import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageConfigurationModal } from './language-configuration.modal';

describe('LanguageConfigurationModal', () => {
  let component: LanguageConfigurationModal;
  let fixture: ComponentFixture<LanguageConfigurationModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageConfigurationModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageConfigurationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
