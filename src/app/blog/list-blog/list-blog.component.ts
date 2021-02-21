import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BlogPostDto } from '../interfaces/blogPostDTO';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss'],
})
export class ListBlogComponent implements OnInit {
  public listPosts: Array<BlogPostDto> = [];

  constructor(private http: HttpClient, private toast: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.http.get(environment.protocol + '://' + environment.host + ':' + environment.port + '/blog-posts').subscribe(
      (data: any) => {
        this.listPosts = data;
      },
      (error) => {
        this.toast.error(error.error.message, 'Ha ocurrido un error');
      }
    );
  }

  public verPost(blog: BlogPostDto) {
    this.router.navigate(['dashboard/blog/view', blog.id]);
  }

  public eliminarPost(blog: BlogPostDto) {
    this.http.delete(environment.protocol + '://' + environment.host + ':' + environment.port + '/blog-posts/' + blog.id).subscribe(
      (data: any) => {
        this.load();
      },
      (error) => {
        this.toast.error(error.error.message, 'Ha ocurrido un error');
      }
    );
  }

  public editPost(blog: BlogPostDto) {
    console.log('proximamente');
  }
}
