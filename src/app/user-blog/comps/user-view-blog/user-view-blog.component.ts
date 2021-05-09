import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BlogPostDto } from 'src/app/blog/interfaces/blogPostDTO';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-view-blog',
  templateUrl: './user-view-blog.component.html',
  styleUrls: ['./user-view-blog.component.scss'],
})
export class UserViewBlogComponent implements OnInit {
  
  constructor() {}

  ngOnInit(): void {
   
  }

  
}
