import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewBlogComponent } from './user-view-blog.component';

describe('UserViewBlogComponent', () => {
  let component: UserViewBlogComponent;
  let fixture: ComponentFixture<UserViewBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
