import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { ChangeDetectorRef } from '@angular/core';
import { DraftDocumentService } from '../../services/draft-document.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './documents.component.html'
})
export class DocumentsComponent implements OnInit {

  articles: any[] = [];
  locations: any[] = [];
  documents: any[] = [];

  loadDocuments() {
    this.api.getDocuments().subscribe((docs: any) => {
      this.documents = docs;
      this.cdr.detectChanges();
    });
  }

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private draftService: DraftDocumentService,
    private fb: FormBuilder
  ) {}
  
  itemForm!: FormGroup;
  documentForm!: FormGroup;

  ngOnInit() {

    this.itemForm = this.fb.group({
      article_id: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      from_location_id: [null, Validators.required],
      to_location_id: [null, Validators.required]
    });

    this.documentForm = this.fb.group({
      code: ['', Validators.required],
      items: this.fb.array([], Validators.required)
    });

    this.api.getArticles().subscribe(a => this.articles = a);
    this.api.getLocations().subscribe(l => this.locations = l);

    if (this.isLoggedIn()) {
      this.loadDocuments();
    }
  }

  get items(): FormArray {
    return this.documentForm.get('items') as FormArray;
  }

  addItem() {
    if (this.itemForm.invalid) {
      alert('Fill in all item fields correctly');
      return;
    }

    this.items.push(
      this.fb.group({
        article_id: [this.itemForm.value.article_id, Validators.required],
        from_location_id: [this.itemForm.value.from_location_id],
        to_location_id: [this.itemForm.value.to_location_id],
        quantity: [this.itemForm.value.quantity, [Validators.required, Validators.min(1)]]
      })
    );

    console.log('ITEMS', this.items.value);
    alert('Item added to document');
  }

  createDocument() {
    if (this.items.length === 0) {
      alert('Add at least one item');
      return;
    }

    const formValue = this.documentForm.value;
    const isLoggedIn = !!localStorage.getItem('token');

    // not logged in
    if (!isLoggedIn) {
      this.draftService.save({
        id: crypto.randomUUID(),
        code: formValue.code,
        items: formValue.items
      });

      alert('Draft saved locally (not sent to server)');

      this.documentForm.reset();
      this.items.clear();
      this.itemForm.reset();

      return;
    }

    // logged in
    this.api.createDocument({
      code: formValue.code,
      items: formValue.items.map((i: {
        article_id: number,
        from_location_id: number,
        to_location_id: number,
        quantity: number
      }) => ({
        article_id: i.article_id,
        from_location_id: i.from_location_id,
        to_location_id: i.to_location_id,
        quantity: i.quantity
      }))
    }).subscribe({
      next: () => {
        alert('Document created in database');
        this.documentForm.reset();
        this.itemForm.reset();
        this.items.clear();
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

}