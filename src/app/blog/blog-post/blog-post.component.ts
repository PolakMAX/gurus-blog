import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly slug = this.route.snapshot.paramMap.get('slug');
} 