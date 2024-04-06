import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  // Gets all posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3000/posts');
  }

  // Add new post
  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(
      'http://localhost:3000/posts/add',
      post,
      httpOptions
    );
  }
}
