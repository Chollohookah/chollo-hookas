import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPostComponent } from '../blog/view-post/view-post.component';
import { ListPostsComponent } from './comps/user-view-blog/list-posts/list-posts.component';
import { ReadPostWrapperComponent } from './comps/user-view-blog/read-post-wrapper/read-post-wrapper.component';
import { UserViewBlogComponent } from './comps/user-view-blog/user-view-blog.component';

const routes: Routes = [
  {
    path: '',
    component: ListPostsComponent,
  },
  {
    path: 'post/:slug',
    component: ReadPostWrapperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserBlogRoutingModule {}
