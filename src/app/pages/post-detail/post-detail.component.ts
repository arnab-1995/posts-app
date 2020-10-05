import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Post from 'src/app/models/post';
import APIResponse from 'src/app/models/response';
import { HttpService } from 'src/app/services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Comment from 'src/app/models/comment';
import { UtilityService } from 'src/app/services/utility.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/components/login/login.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  postComment: string;
  constructor(private route: ActivatedRoute, private httpservice: HttpService,
    private spinner: NgxSpinnerService, private utilitySvc: UtilityService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.spinner.show();
    this.httpservice.getPost(+this.route.snapshot.paramMap.get('id')).subscribe((x: APIResponse) => {
      this.post = x.data;
      this.httpservice.getPostAuthor(this.post.user_id).subscribe((y: APIResponse) => {
        this.post.author = y.data.name;
        this.spinner.hide();
      });
      this.httpservice.getPostComments(this.post.id).subscribe((z: APIResponse) => {
        const comments = z.data.sort((x, y) => new Date(y.created_at).getTime() - new Date(x.created_at).getTime());
        this.post.comments = comments;
      })
    }, err => {
      console.log('Failed to fetch post details: ' + err);
      this.spinner.hide();
    })
  }

  onPostComment() {
    if (!this.utilitySvc.getCookie('email')) {
      this.modalService.open(LoginComponent, { ariaLabelledBy: 'modal-basic-title', centered: true });
    } else {
      const comment: Comment = {
        name: this.utilitySvc.getCookie('username'),
        email: this.utilitySvc.getCookie('email'),
        body: this.postComment
      }
      this.spinner.show();
      this.httpservice.createPostComment(this.post.id, comment).subscribe((resp: APIResponse) => {
        this.post.comments.unshift({ name: resp.data.name, body: resp.data.body, email: resp.data.email });
        this.postComment = "";
        this.spinner.hide();
      }, err => {
        console.log('Failed to post comment: ' + err);
        this.spinner.hide();
      })
    }

  }

}
