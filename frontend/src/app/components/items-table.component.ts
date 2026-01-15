import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="table table-sm table-bordered" *ngIf="items.length">
      <thead>
        <tr>
          <th>Article</th>
          <th>From</th>
          <th>To</th>
          <th>Qty</th>
          <th *ngIf="removable">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let item of items; let i = index">
          <td>{{ resolveArticle(item) }}</td>
          <td>{{ resolveFrom(item) }}</td>
          <td>{{ resolveTo(item) }}</td>
          <td>{{ resolveQuantity(item) }}</td>

          <td *ngIf="removable">
            <button
              class="btn btn-sm btn-danger"
              (click)="remove.emit(i)">
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class ItemsTableComponent {
  @Input() items: any[] = [];
  @Input() articleMap?: Map<number, string>;
  @Input() locationMap?: Map<number, string>;

  @Input() removable = false;

  @Output() remove = new EventEmitter<number>();

  resolveArticle(item: any): string {
    const val = item.value ?? item;
    return val.article_name ?? this.articleMap?.get(val.article_id) ?? 'Unknown';
    }

    resolveFrom(item: any): string {
    const val = item.value ?? item;
    return val.from_location_name ?? this.locationMap?.get(val.from_location_id) ?? 'Unknown';
    }

    resolveTo(item: any): string {
    const val = item.value ?? item;
    return val.to_location_name ?? this.locationMap?.get(val.to_location_id) ?? 'Unknown';
    }

    resolveQuantity(item: any) {
        const val = item.value ?? item;
        return val.quantity ?? '-';
    }

}