import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ListBlogComponent } from './list-blog/list-blog.component';
import { ViewPostComponent } from './view-post/view-post.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddBlogComponent,
  },
  {
    path: 'list',
    component: ListBlogComponent,
  },
  {
    path: 'view/:id',
    component: ViewPostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
