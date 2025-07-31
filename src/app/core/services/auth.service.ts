import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUser = signal<User | null>(null);
  private readonly isAuthenticatedSignal = signal(false);

  constructor(private http: HttpClient, private router: Router) {
    // Check for existing token on service initialization
    this.checkAuthStatus();
  }

  protected readonly user = this.currentUser.asReadonly();
  protected readonly _isAuthenticated = this.isAuthenticatedSignal.asReadonly();

  private checkAuthStatus(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      // In a real app, you would validate the token with the backend
      // For now, we'll just check if it exists
      this.isAuthenticatedSignal.set(true);
      // You would also fetch user data here
    }
  }

  async login(credentials: LoginCredentials): Promise<boolean> {
    try {
      // In a real app, this would be an HTTP call to your backend
      // const response = await this.http.post<{token: string, user: User}>('/api/auth/login', credentials).toPromise();

      // Mock response for now
      const mockResponse = {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          username: credentials.username,
          email: 'admin@example.com',
        },
      };

      // Store token
      localStorage.setItem('auth_token', mockResponse.token);

      // Update state
      this.currentUser.set(mockResponse.user);
      this.isAuthenticatedSignal.set(true);

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }

  logout(): void {
    // Clear token
    localStorage.removeItem('auth_token');

    // Clear state
    this.currentUser.set(null);
    this.isAuthenticatedSignal.set(false);

    // Redirect to home
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated();
  }
} 