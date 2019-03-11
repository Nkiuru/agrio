import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLocationComponent } from './post-location.component';

describe('PostLocationComponent', () => {
  let component: PostLocationComponent;
  let fixture: ComponentFixture<PostLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
