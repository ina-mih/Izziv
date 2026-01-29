import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { ChangeDetectorRef } from '@angular/core';
import { DraftDocumentService } from '../../services/draft-document.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ItemsTableComponent } from '../../components/items-table.component';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, ItemsTableComponent, FormsModule, ReactiveFormsModule,
    InputTextModule, InputNumberModule, SelectModule,
    ButtonModule, CardModule, TableModule, TagModule
  ],
  templateUrl: './documents.component.html'
})
export class DocumentsComponent implements OnInit {

  articles: any[] = [];
  locations: any[] = [];
  documents: any[] = [];

  articleMap = new Map<number, string>();
  locationMap = new Map<number, string>();

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
    private fb: FormBuilder,
    private toastr: ToastrService
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

    this.api.getArticles().subscribe(a => {
      this.articles = a;
      this.articleMap.clear();
      a.forEach(x => this.articleMap.set(x.id, x.name));
      this.cdr.detectChanges();
    });

    this.api.getLocations().subscribe(l => {
      this.locations = l;
      this.locationMap.clear();
      l.forEach(x => this.locationMap.set(x.id, x.name));
      this.cdr.detectChanges();
    });

    if (this.isLoggedIn()) {
      this.loadDocuments();
    }
  }

  get items(): FormArray {
    return this.documentForm.get('items') as FormArray;
  }

  addItem() {
    if (this.itemForm.invalid) {
      this.toastr.warning('Fill in all item fields correctly');
      return;
    }

    this.items.push(
      this.fb.group({
        article_id: [Number(this.itemForm.value.article_id), Validators.required],
        from_location_id: [Number(this.itemForm.value.from_location_id)],
        to_location_id: [Number(this.itemForm.value.to_location_id)],
        quantity: [this.itemForm.value.quantity, [Validators.required, Validators.min(1)]]
      })
    );

    this.toastr.success('Item added to document');
  }


  createDocument() {
    if (this.items.length === 0) {
      this.toastr.warning('Add at least one item');
      return;
    }

    const formValue = this.documentForm.value;
    const isLoggedIn = this.isLoggedIn();

    // not logged in
    if (!isLoggedIn) {
      this.draftService.save({
        id: crypto.randomUUID(),
        code: formValue.code,
        items: formValue.items
      });

      this.toastr.success('Draft saved locally');

      this.documentForm.reset();
      this.items.clear();
      this.itemForm.reset();
      return;
    }

    // logged in
    this.api.createDocument({
      code: formValue.code,
      items: formValue.items.map((i: any) => ({
        article_id: i.article_id,
        from_location_id: i.from_location_id,
        to_location_id: i.to_location_id,
        quantity: i.quantity
      }))
    }).subscribe({
      next: () => {
        this.toastr.success('Document created');
        this.documentForm.reset();
        this.itemForm.reset();
        this.items.clear();
        this.loadDocuments();
      },
      error: () => {
        this.toastr.error('Failed to create document');
      }
    });
  }

  confirmExisting(id: number) {
    if (!confirm('Confirm this document?')) return; 

    this.api.confirmDocument(id).subscribe({
      next: () => {
        this.toastr.success('Document confirmed');
        this.loadDocuments();
      },
      error: (err) => {
        if (err.status === 400) {
          this.toastr.error(err.error.message);
        } else {
          this.toastr.error('Failed to confirm document');
        }
      }
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get itemControls(): FormGroup[] {
    return this.items.controls as FormGroup[];
  }

}