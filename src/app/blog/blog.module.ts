import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { ListBlogComponent } from './list-blog/list-blog.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralesModule } from '@tihomir22/generales-wrapper-lib';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { MatCardModule } from '@angular/material/card';
import { ViewPostComponent } from './view-post/view-post.component';

@NgModule({
  declarations: [AddBlogComponent, ListBlogComponent, ViewPostComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    QuillModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    GeneralesModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class BlogModule {}
