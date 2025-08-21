export type PostTemplate = 'A' | 'B' | 'C';

export interface Post {
  id: string;
  title: string;
  content: string;
  template: PostTemplate;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostResponse {
  data: Post[];
  message: string;
  status: string;
}