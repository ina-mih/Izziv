import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftDocumentService } from '../../services/draft-document.service';
import { ApiService } from '../../services/api';
import { DraftDocument } from '../../models/draft-document';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import { ItemsTableComponent } from '../../components/items-table.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-drafts',
  standalone: true,
  imports: [CommonModule, ItemsTableComponent, CardModule, ButtonModule],
  templateUrl: './drafts.component.html'
})
export class DraftsComponent implements OnInit {

  drafts: DraftDocument[] = [];

  constructor(
    private draftService: DraftDocumentService,
    private api: ApiService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  articles: any[] = [];
  locations: any[] = [];
  articleMap = new Map<number, string>();
  locationMap = new Map<number, string>();

  ngOnInit() {
    this.drafts = this.draftService.getAll();

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
  }

  refresh() {
    this.drafts = this.draftService.getAll();
  }

  convert(draft: DraftDocument) {
    if (!draft.items.length) {
      this.toastr.error('Draft has no items');
      return;
    }

    const invalid = draft.items.some(
      i => !i.from_location_id || !i.to_location_id
    );

    if (invalid) {
      this.toastr.error('Draft items missing locations');
      return;
    }

    this.api.createDocument({
      code: draft.code,
      items: draft.items.map(i => ({
        article_id: i.article_id,
        from_location_id: i.from_location_id,
        to_location_id: i.to_location_id,
        quantity: i.quantity
      }))
    }).subscribe({
      next: () => {
        this.draftService.remove(draft.id);
        this.refresh();
        this.cdr.detectChanges();
        this.toastr.success('Draft converted to document');
      },
      error: err => this.toastr.error('Failed to convert draft to document')
    });
  }

  getArticleName(id: number): string {
    const article = this.articles.find(a => a.id === id);
    return article ? article.name : 'Unknown';
  }

  getLocationName(id: number): string {
    const location = this.locations.find(l => l.id === id);
    return location ? location.name : 'Unknown';
  }

  removeDraftItem(draftId: string, index: number) {
    const draft = this.drafts.find(d => d.id === draftId);
    if (!draft) return;
    draft.items.splice(index, 1);
    this.draftService.remove(draft.id);
    this.draftService.save(draft);
    this.refresh();
    this.toastr.success('Item removed from draft');
  }

  removeDraft(draftId: string) {
  if (!confirm('Are you sure you want to delete this draft?')) return;
  this.draftService.remove(draftId);
  this.refresh();
  this.toastr.success('Draft removed successfully');
  }

}