import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { ListBlogComponent } from './list-blog/list-blog.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { MatCardModule } from '@angular/material/card';
import { ViewPostComponent } from './view-post/view-post.component';
import { GeneralesModule } from '@chollohookah/generales-wrapper-lib';
import { MatIconModule } from '@angular/material/icon';
import { MomentModule } from 'ngx-moment';
import { MaterialModule } from '../material/material.module';

import { ShareButtonsConfig } from 'ngx-sharebuttons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@NgModule({
  declarations: [AddBlogComponent, ListBlogComponent, ViewPostComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    QuillModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    HttpClientModule,
    GeneralesModule,
    MomentModule,
    ShareIconsModule,
    ShareButtonsModule,
  ],
  exports: [ViewPostComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class BlogModule {}
