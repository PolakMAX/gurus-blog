import { Injectable, signal } from '@angular/core';

export type PostTemplate = 'A' | 'B' | 'C';

export interface Post {
  id: string;
  title: string;
  content: string;
  template: PostTemplate;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly postsSignal = signal<Post[]>([
    {
      id: '1',
      title: 'Welcome to Guru Blog',
      content: '<p>This is a sample post.</p>',
      template: 'A',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  get posts() {
    return this.postsSignal.asReadonly();
  }

  getPost(id: string): Post | undefined {
    return this.postsSignal().find((p) => p.id === id);
  }

  createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post {
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).slice(2),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.postsSignal.update((posts) => [newPost, ...posts]);
    return newPost;
  }

  updatePost(id: string, update: Partial<Omit<Post, 'id' | 'createdAt'>>): boolean {
    let updated = false;
    this.postsSignal.update((posts) =>
      posts.map((p) => {
        if (p.id === id) {
          updated = true;
          return {
            ...p,
            ...update,
            updatedAt: new Date(),
          };
        }
        return p;
      })
    );
    return updated;
  }

  deletePost(id: string): boolean {
    const before = this.postsSignal().length;
    this.postsSignal.update((posts) => posts.filter((p) => p.id !== id));
    return this.postsSignal().length < before;
  }
}
