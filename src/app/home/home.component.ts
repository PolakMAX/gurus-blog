import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly welcomeMessage = 'Welcome to Guru\'s Blog';
  protected readonly description = 'A place for sharing insights, knowledge, and experiences through thoughtful content and engaging stories.';
} 