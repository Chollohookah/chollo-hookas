import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadPostWrapperComponent } from './read-post-wrapper.component';

describe('ReadPostWrapperComponent', () => {
  let component: ReadPostWrapperComponent;
  let fixture: ComponentFixture<ReadPostWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadPostWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadPostWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
