import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    RippleModule,
    FloatLabelModule
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  form!: FormGroup;
  error = '';
  success = '';

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    if (this.form.invalid) return;

    this.error = '';
    this.success = '';

    this.api.register(this.form.value.email, this.form.value.password).subscribe({
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

  get f() {
    return this.form.controls;
  }
}