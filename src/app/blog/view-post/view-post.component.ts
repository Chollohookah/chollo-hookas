import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BlogPostDto } from '../interfaces/blogPostDTO';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent implements OnInit {
  public postBlog: BlogPostDto;

  constructor(private http: HttpClient, private route: ActivatedRoute, private toast: ToastrService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      let id = data.get('id');
      let slug = data.get('slug');
      if (id) {
        this.http.get(environment.protocol + '://' + environment.host + ':' + environment.port + '/blog-posts/' + id).subscribe(
          (data: any) => {
            this.postBlog = data;
          },
          (error) => {
            this.toast.error(error.error.message, 'Ha ocurrido un error');
          }
        );
      } else if (slug) {
        this.http.get(environment.protocol + '://' + environment.host + ':' + environment.port + '/blog-posts/slug/' + slug).subscribe(
          (data: any) => {
            this.postBlog = data;
          },
          (error) => {
            this.toast.error(error.error.message, 'Ha ocurrido un error');
          }
        );
      }
    });
  }
}
