import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { ChangeDetectorRef } from '@angular/core';
import { DraftDocumentService } from '../../services/draft-document.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documents.component.html'
})
export class DocumentsComponent implements OnInit {

  document = {
    id: 0,
    code: '',
    items: [] as {
      article_id: number;
      from_location_id: number;
      to_location_id: number;
      quantity: number;
    }[],
    from_location_id: 0,
    to_location_id: 0
  };

  articles: any[] = [];
  locations: any[] = [];
  documents: any[] = [];

  loadDocuments() {
    this.api.getDocuments().subscribe((docs: any) => {
      this.documents = docs;
      this.cdr.detectChanges();
    });
  }

  constructor(private api: ApiService, private cdr: ChangeDetectorRef, private draftService: DraftDocumentService) {}


  ngOnInit() {
    this.api.getArticles().subscribe(a => this.articles = a);
    this.api.getLocations().subscribe(l => this.locations = l);

    if (this.isLoggedIn()) {
      this.loadDocuments();
    }
  }

  addItem(articleId: number, qty: number) {
    if (!this.document.from_location_id || !this.document.to_location_id) {
      alert('Select FROM and TO locations first');
      return;
    }

    this.document.items.push({
      article_id: articleId,
      from_location_id: this.document.from_location_id,
      to_location_id: this.document.to_location_id,
      quantity: qty
    });

    console.log('ITEMS', this.document.items);
    alert('Item added to document');
  }

  createDocument() {
    if (this.document.items.length === 0) {
      alert('Add at least one item');
      return;
    }

    const isLoggedIn = !!localStorage.getItem('token');

    // not logged in
    if (!isLoggedIn) {
      this.draftService.save({
        id: crypto.randomUUID(),
        code: this.document.code,
        items: this.document.items
      });

      alert('Draft saved locally (not sent to server)');

      this.document.code = '';
      this.document.items = [];

      return;
    }

    // logged in
    this.api.createDocument({
      code: this.document.code,
      items: this.document.items.map(i => ({
        article_id: i.article_id,
        from_location_id: i.from_location_id,
        to_location_id: i.to_location_id,
        quantity: i.quantity
      }))
    }).subscribe({
      next: () => {
        alert('Document created in database');
        this.loadDocuments();
      },
      error: err => console.error('CREATE ERROR', err)
    });
  }

  confirmExisting(id: number) {
    if (!confirm('Confirm this document?')) return;

    this.api.confirmDocument(id).subscribe({
      next: () => {
        alert('Document confirmed');
        this.loadDocuments();
      },
      error: (err) => {
        if (err.status === 400) {
          alert(err.error.message);
        } else {
          console.error('CONFIRM ERROR', err);
        }
      }
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

}