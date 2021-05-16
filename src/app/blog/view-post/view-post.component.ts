import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BlogPostDto } from '../interfaces/blogPostDTO';
import * as readingTime from 'reading-time';
import { ceil } from 'lodash-es';
export interface ViewPostUserAvatar {
  id: string;
  username: string;
  name: string;
}
@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent implements OnInit {
  public postBlog: BlogPostDto;
  public userBasicInfo: ViewPostUserAvatar;
  public today = new Date();
  public minutesToReadPost: number = 0;
  public haciendoHoverLikes: boolean = false;
  private maximoDeLikesPorUsuario = 5;
  constructor(private http: HttpClient, private route: ActivatedRoute, private toast: ToastrService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (routeParam: ParamMap) => {
      this.postBlog = await this.getPost(routeParam);
      this.minutesToReadPost = ceil(readingTime(this.postBlog.htmlContent, {}).minutes);
      this.userBasicInfo = await this.getUser(this.postBlog.userId);
    });
  }

  private getPost(data: ParamMap): Promise<BlogPostDto> {
    return new Promise((resolve, reject) => {
      let id = data.get('id');
      let slug = data.get('slug');
      if (id) {
        this.http.get(environment.protocol + '://' + environment.host + ':' + environment.port + '/blog-posts/' + id).subscribe(
          (data: any) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
      } else if (slug) {
        this.http.get(environment.protocol + '://' + environment.host + ':' + environment.port + '/blog-posts/slug/' + slug).subscribe(
          (data: any) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  private getUser(userId: string): Promise<ViewPostUserAvatar> {
    return this.http
      .get(
        environment.protocol +
          '://' +
          environment.host +
          ':' +
          environment.port +
          '/users/' +
          userId +
          `?filter=${JSON.stringify({ fields: { username: true, id: true, name: true } })}`
      )
      .toPromise() as any;
  }

  public async addLike() {
    let currentLikesByUser: number = Number(this.getPostLikesByCurrentUser(this.postBlog.id));
    if (currentLikesByUser < this.maximoDeLikesPorUsuario) {
      let newLikes = this.postBlog.likes != null ? this.postBlog.likes + 1 : 1;
      await this.http
        .patch(environment.protocol + '://' + environment.host + ':' + environment.port + '/blog-posts/' + this.postBlog.id, {
          likes: newLikes,
        })
        .toPromise();
      let likesObj = await (this.http
        .get(
          environment.protocol +
            '://' +
            environment.host +
            ':' +
            environment.port +
            '/blog-posts/' +
            this.postBlog.id +
            `?filter=${JSON.stringify({ fields: { likes: true } })}`
        )
        .toPromise() as Promise<{ likes: number }>);
      this.postBlog.likes = likesObj.likes;
      this.postHasBeenLiked(this.postBlog.id);
    } else {
      this.toast.warning('Nos gusta tu estilo pero no podemos permitir que sigas dando likes por motivos de SPAM', 'Bloqueado');
    }
  }

  private postHasBeenLiked(postId: string) {
    let currentLikesByUser: number = Number(this.getPostLikesByCurrentUser(postId));
    let newLikesByUser = currentLikesByUser + 1;
    localStorage.setItem(postId, newLikesByUser.toString());
    this.toast.success('Indicaste que te gusta este post', 'Bocanada realizada');
  }

  private getPostLikesByCurrentUser(postId: string) {
    return localStorage.getItem(postId) || 0;
  }
}
