import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftDocumentService } from '../../services/draft-document.service';
import { ApiService } from '../../services/api';
import { DraftDocument } from '../../models/draft-document';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-drafts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drafts.component.html'
})
export class DraftsComponent implements OnInit {

  drafts: DraftDocument[] = [];

  constructor(
    private draftService: DraftDocumentService,
    private api: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
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
        this.drafts = this.draftService.getAll();
        this.toastr.success('Draft converted to document');
      },
      error: err => this.toastr.error('Failed to convert draft to document')
    });
  }
}