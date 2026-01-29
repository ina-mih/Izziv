import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-articles',
  imports: [CommonModule, ReactiveFormsModule,
    InputTextModule, ButtonModule, CardModule, TableModule, RippleModule, FloatLabelModule
  ],
  templateUrl: './articles.component.html'
})
export class ArticlesComponent implements OnInit {

  articles: any[] = [];
  form!: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.maxLength(20)]],
      ean: ['', [Validators.required, Validators.pattern(/^[0-9]{8,13}$/)]],
      unit: ['', Validators.required]
    });

    this.loadArticles();
  }

  loadArticles() {
    this.api.getArticles().subscribe((data: any) => {
      this.articles = data;
      this.cdr.detectChanges();
    });
  }

  submit() {
    if (this.form.invalid) return;

    if (this.form.value.id) {
      this.api.updateArticle(this.form.value.id, this.form.value).subscribe(() => {
        this.reset();
        this.loadArticles();
      });
    } else {
      this.api.createArticle(this.form.value).subscribe(() => {
        this.reset();
        this.loadArticles();
      });
    }
  }

  edit(article: any) {
    this.form.patchValue(article);
  }

  delete(id: number) {
    if (confirm('Delete this article?')) {
      this.api.deleteArticle(id).subscribe(() => {
        this.loadArticles();
      });
    }
  }

  reset() {
    this.form.reset();
  }

  get f() {
    return this.form.controls;
  }
}