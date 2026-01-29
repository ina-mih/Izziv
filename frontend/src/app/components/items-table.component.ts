import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-items-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule],
  template: `
    <p-table *ngIf="items.length" [value]="items" dataKey="id" responsiveLayout="scroll">
      <ng-template pTemplate="header">
        <tr>
          <th>Article</th>
          <th>From</th>
          <th>To</th>
          <th>Qty</th>
          <th *ngIf="removable">Action</th>
        </tr>
      </ng-template>

      <ng-template pTemplate="body" let-item let-i="rowIndex">
        <tr>
          <td>{{ resolveArticle(item) }}</td>
          <td>{{ resolveFrom(item) }}</td>
          <td>{{ resolveTo(item) }}</td>
          <td>{{ resolveQuantity(item) }}</td>

          <td *ngIf="removable">
          <p-button
            icon="pi pi-times"
            iconPos="left"
            severity="danger"
            class="p-button-rounded p-button-sm"
            (onClick)="remove.emit(i)">
          </p-button>
          </td>
        </tr>
      </ng-template>
    </p-table>
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

  resolveQuantity(item: any): string | number {
    const val = item.value ?? item;
    return val.quantity ?? '-';
  }
}