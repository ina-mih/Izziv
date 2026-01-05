import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  email = '';
  password = '';
  error = '';
  success = '';

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  register() {
    this.error = '';
    this.success = '';

    if (!this.email || !this.password) {
      this.error = 'Email and password are required';
      return;
    }

    this.api.register(this.email, this.password).subscribe({
      next: () => {
        this.success = 'Registration successful. You can now log in.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: err => {
        this.error = err.error?.message || 'Registration failed';
      }
    });
  }
}