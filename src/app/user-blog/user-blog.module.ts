import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserBlogRoutingModule } from './user-blog-routing.module';
import { UserViewBlogComponent } from './comps/user-view-blog/user-view-blog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './comps/user-view-blog/navbar/navbar.component';
import { GeneralesModule } from '@chollohookah/generales-wrapper-lib';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from '../material/material.module';
import { ListPostsComponent } from './comps/user-view-blog/list-posts/list-posts.component';
import { BlogModule } from '../blog/blog.module';
import { ViewPostComponent } from '../blog/view-post/view-post.component';
import { ReadPostWrapperComponent } from './comps/user-view-blog/read-post-wrapper/read-post-wrapper.component';

export const localComponents = [UserViewBlogComponent, NavbarComponent, ListPostsComponent, ReadPostWrapperComponent];
@NgModule({
  declarations: localComponents,
  exports: localComponents,
  providers: [],
  imports: [CommonModule, UserBlogRoutingModule, NgbModule, MaterialModule, GeneralesModule, BlogModule],
})
export class UserBlogModule {}
