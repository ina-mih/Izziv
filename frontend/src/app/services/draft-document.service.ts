import { Injectable } from '@angular/core';
import { DraftDocument } from '../models/draft-document';

@Injectable({ providedIn: 'root' })
export class DraftDocumentService {
  private storageKey = 'draft_documents';

  getAll(): DraftDocument[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  save(draft: DraftDocument) {
    const drafts = this.getAll();
    drafts.push(draft);
    localStorage.setItem(this.storageKey, JSON.stringify(drafts));
  }

  remove(id: string) {
    const drafts = this.getAll().filter(d => d.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(drafts));
  }
}