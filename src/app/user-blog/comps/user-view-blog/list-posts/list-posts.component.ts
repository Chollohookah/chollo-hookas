import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogPostDto } from 'src/app/blog/interfaces/blogPostDTO';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss'],
})
export class ListPostsComponent implements OnInit {
  public listPosts: Array<BlogPostDto> = [];
  constructor(private http: HttpClient, private toast: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.http.get(environment.protocol + '://' + environment.host + ':' + environment.port + '/blog-posts').subscribe(
      (data: Array<BlogPostDto>) => {
        this.listPosts = data.filter((entry) => entry.visible);
        console.log(this.listPosts);
      },
      (error) => {
        this.toast.error(error.error.message, 'Ha ocurrido un error');
      }
    );
  }

  public navigateToPost(post: BlogPostDto) {
    this.router.navigate(['/blog/post/', post.slug], {});
  }
}
