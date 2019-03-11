import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedPostsPage } from './liked-posts.page';

describe('LikedPostsPage', () => {
  let component: LikedPostsPage;
  let fixture: ComponentFixture<LikedPostsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedPostsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedPostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
