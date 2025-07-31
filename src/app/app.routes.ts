import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Public routes
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  
  // Blog routes (to be implemented)
  { path: 'blog', loadComponent: () => import('./blog/blog-list/blog-list.component').then(m => m.BlogListComponent) },
  { path: 'post/:slug', loadComponent: () => import('./blog/blog-post/blog-post.component').then(m => m.BlogPostComponent) },
  
  // Admin routes (protected with auth guard)
  { path: 'admin/login', loadComponent: () => import('./admin/admin-login/admin-login.component').then(m => m.AdminLoginComponent) },
  { 
    path: 'admin', 
    loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'admin/posts', 
    loadComponent: () => import('./admin/posts-management/posts-management.component').then(m => m.PostsManagementComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'admin/gallery', 
    loadComponent: () => import('./admin/image-gallery/image-gallery.component').then(m => m.ImageGalleryComponent),
    canActivate: [authGuard]
  },
  
  // Catch all route
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
