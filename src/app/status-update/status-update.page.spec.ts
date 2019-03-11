import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusUpdatePage } from './status-update.page';

describe('StatusUpdatePage', () => {
  let component: StatusUpdatePage;
  let fixture: ComponentFixture<StatusUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
