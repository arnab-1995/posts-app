import { Component, OnInit } from '@angular/core';
import Post from 'src/app/models/post';
import { HttpService } from 'src/app/services/http.service';
import { NgxSpinnerService } from "ngx-spinner";
import APIResponse from 'src/app/models/response';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  pageId = 1;
  constructor(private httpservice: HttpService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getPosts(this.pageId);
  }

  getPosts(pageId: number) {
    this.spinner.show()
    this.httpservice.getPagedPosts(pageId).subscribe((resp: APIResponse) => {
      this.posts.push(...resp.data);
      this.spinner.hide();
    }, err => {
      console.log('Error occurred while fetching posts: ' + err);
      this.spinner.hide();
    })
  }

  onScroll() {
    this.getPosts(++this.pageId);
  }

}
