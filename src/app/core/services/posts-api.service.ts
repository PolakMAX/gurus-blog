import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Post, PostResponse } from '../../shared/models/posts.model';


@Injectable({ providedIn: 'root' })
export class PostsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl + '/post';

  readonly postResponse = httpResource<Post[]>(
    () => `${environment.apiUrl}/post`,
    {
      defaultValue: [],
      parse: (raw: unknown) => (raw as { data: Post[] }).data,
    }
  );

  reloadPosts() {
    this.postResponse.reload();
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }

  createPost(
    post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>
  ): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post);
  }

  updatePost(
    id: string,
    update: Partial<Omit<Post, 'id' | 'createdAt'>>
  ): Observable<Post> {
    return this.http.patch<Post>(`${this.baseUrl}/${id}`, update);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
