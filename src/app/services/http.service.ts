import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as settings from '../../assets/settings.json';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import User from '../models/user';
import Comment from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private API_URL: string;
  private ACCESS_TOKEN: string;

  constructor(private http: HttpClient) {
    this.API_URL = settings.API_URL;
    this.ACCESS_TOKEN = settings.ACCESS_TOKEN;
  }

  getPagedPosts(pageId: number) {
    return this.http.get(this.API_URL + 'posts?page=' + pageId).pipe(catchError(this.handleError));
  }

  getPost(postId: number) {
    return this.http.get(this.API_URL + 'posts/' + postId).pipe(catchError(this.handleError));
  }

  getPostAuthor(userid: number) {
    return this.http.get(this.API_URL + 'users/' + userid).pipe(catchError(this.handleError));
  }

  getPostComments(postId: number) {
    return this.http.get(this.API_URL + 'posts/' + postId + '/comments').pipe(catchError(this.handleError));
  }

  createUser(body: User) {
    return this.http.post(this.API_URL + 'users', JSON.stringify(body), { headers: this.generateHttpHeaders() }).pipe(catchError(this.handleError));
  }

  createPostComment(postId: number, body: Comment) {
    return this.http.post(this.API_URL + 'posts/' + postId + '/comments', JSON.stringify(body), { headers: this.generateHttpHeaders() }).pipe(catchError(this.handleError));
  }

  private generateHttpHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.ACCESS_TOKEN);
    headers = headers.append('Content-Type', 'application/json');

    return headers;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
