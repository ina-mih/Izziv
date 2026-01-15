import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div *ngIf="items.length > 0" class="mb-3">
      <h5>Items to be added:</h5>
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Article</th>
            <th>From Location</th>
            <th>To Location</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of items; let i = index" [formGroup]="item">
            <td>{{ getArticleName(item.value.article_id) }}</td>
            <td>{{ getLocationName(item.value.from_location_id) }}</td>
            <td>{{ getLocationName(item.value.to_location_id) }}</td>
            <td>{{ item.value.quantity }}</td>
            <td>
              <button type="button" class="btn btn-sm btn-danger" (click)="remove(i)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ItemsListComponent {

  @Input() items: FormGroup[] = [];
  @Input() articles: any[] = [];
  @Input() locations: any[] = [];

  @Output() removeItem = new EventEmitter<number>();

  constructor(private toastr: ToastrService) {}

  remove(index: number) {
    this.removeItem.emit(index);
    this.toastr.success('Item removed');
  }

  getArticleName(id: number) {
    const article = this.articles.find(a => a.id === id);
    return article ? article.name : '';
  }

  getLocationName(id: number) {
    const loc = this.locations.find(l => l.id === id);
    return loc ? loc.name : '';
  }
}