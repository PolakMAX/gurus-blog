import { Component, inject, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';
import { NgxEditorModule, Editor } from 'ngx-editor';
import { PostTemplate } from '../../shared/models/posts.model';

@Component({
  selector: 'app-posts-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    NgxEditorModule
  ],
  templateUrl: './posts-editor.component.html',
  styleUrl: './posts-editor.component.scss',
})
export class PostsEditorComponent implements OnDestroy {
  editor = new Editor();
  private readonly fb = inject(FormBuilder);
  private readonly postsService = inject(PostsService);
  readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  postId = signal<string | null>(null);
  isEdit = computed(() => !!this.postId());
  loading = signal(false);
  error = signal<string | null>(null);

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    template: ['A', Validators.required],
  });

  templates: { value: PostTemplate; label: string }[] = [
    { value: 'A', label: 'Template A (Text-heavy)' },
    { value: 'B', label: 'Template B (Mixed)' },
    { value: 'C', label: 'Template C (Gallery style)' },
  ];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.postId.set(id);
        this.postsService.getPost(id).subscribe({
          next: (post) => {
            if (post) {
              this.form.patchValue({
                title: post.title,
                content: post.content,
                template: post.template,
              });
            }
          },
          error: () => {
            this.error.set('Failed to load post.');
          }
        });
      }
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    try {
      if (this.isEdit()) {
        this.postsService.updatePost(this.postId()!, this.form.value);
      } else {
        this.postsService.createPost(this.form.value);
      }
      this.router.navigate(['/admin/posts']);
    } catch (e) {
      this.error.set('Failed to save post.');
    } finally {
      this.loading.set(false);
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
