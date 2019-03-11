import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePage } from './recipe.page';

describe('RecipePage', () => {
  let component: RecipePage;
  let fixture: ComponentFixture<RecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
