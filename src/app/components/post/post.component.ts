import { Component, OnInit, Input } from '@angular/core';
import Post from 'src/app/models/post';
import { HttpService } from 'src/app/services/http.service';
import APIResponse from 'src/app/models/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  summaryText: string;
  summaryLength = 120;
  constructor(private httpservice: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.httpservice.getPostAuthor(this.post.user_id).subscribe((resp: APIResponse) => {
      this.post.author = resp.data.name;
    }, err => {
      console.log('Error occurred while fetching author of post: ' + err);
    })
    this.summaryText = this.summarizePost();
  }

  summarizePost() {
    return this.post.body.substr(0, this.summaryLength) + "...";
  }

  navigateToPostDetail() {
    this.router.navigate(['/posts/' + this.post.id]);
  }

}
