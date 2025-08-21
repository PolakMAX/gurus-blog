import { Injectable, signal, inject, computed } from '@angular/core';
import { PostsApiService } from './posts-api.service';
import { Post } from '../../shared/models/posts.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private postApi = inject(PostsApiService);

  readonly posts = this.postApi.postResponse;

  getPost(id: any) {
    return this.postApi.getPost(id);
  }

  createPost(post: Post) {
    return this.postApi
      .createPost(post)
      .pipe(tap(() => this.postApi.reloadPosts()));
  }

  updatePost(id: any, update: any) {
    this.postApi
      .updatePost(id, update)
      .subscribe((res) => this.postApi.reloadPosts());
  }

  deletePost(id: any) {
    this.postApi.deletePost(id).subscribe((res) => this.postApi.reloadPosts());
  }

  // get posts() {
  //   return this.postsSignal;
  // }
}
