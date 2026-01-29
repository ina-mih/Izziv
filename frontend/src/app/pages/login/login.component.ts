import { Component } from '@angular/core';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card'; 
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    RippleModule,
    FloatLabelModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form!: FormGroup;
  error = '';

  constructor(private api: ApiService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.form.invalid) return;

    this.api.login(this.form.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['home']);
      },
      error: () => this.error = 'Invalid login'
    });
  }

  get f() {
    return this.form.controls;
  }
}