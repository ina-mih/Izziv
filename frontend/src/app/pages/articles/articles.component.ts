import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  standalone: true,
  selector: 'app-articles',
  imports: [CommonModule, FormsModule],
  templateUrl: './articles.component.html'
})
export class ArticlesComponent implements OnInit {

  articles: any[] = [];

  form = {
    id: null,
    name: '',
    description: '',
    ean: '',
    unit: ''
  };

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.api.getArticles().subscribe((data: any) => {
      this.articles = data;
      this.cdr.detectChanges();
    });
  }

  submit() {
    if (this.form.id) {
      this.api.updateArticle(this.form.id, this.form).subscribe(() => {
        this.reset();
        this.loadArticles();
      });
    } else {
      this.api.createArticle(this.form).subscribe(() => {
        this.reset();
        this.loadArticles();
      });
    }
  }

  edit(article: any) {
    this.form = { ...article };
  }

  delete(id: number) {
    if (confirm('Delete this article?')) {
      this.api.deleteArticle(id).subscribe(() => {
        this.loadArticles();
      });
    }
  }

  reset() {
    this.form = {
      id: null,
      name: '',
      description: '',
      ean: '',
      unit: ''
    };
  }
}