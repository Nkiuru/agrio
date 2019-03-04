import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaItemCardComponent } from './media-item-card.component';

describe('MediaItemCardComponent', () => {
  let component: MediaItemCardComponent;
  let fixture: ComponentFixture<MediaItemCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
