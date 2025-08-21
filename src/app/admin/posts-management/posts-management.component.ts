import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';

@Component({
  selector: 'app-posts-management',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './posts-management.component.html',
  styleUrl: './posts-management.component.scss',
})
export class PostsManagementComponent {
  private readonly postsService = inject(PostsService);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  postsRes = inject(PostsService).posts;

  goToCreate() {
    this.router.navigate(['/admin/posts/create']);
  }

  goToEdit(id: string) {
    this.router.navigate(['/admin/posts/edit', id]);
  }

  deletePost(id: string) {
    this.postsService.deletePost(id);
  }

  goBack() {
    this.location.back();
  }
}