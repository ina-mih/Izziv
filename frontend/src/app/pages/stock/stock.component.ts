import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  standalone: true,
  selector: 'app-stock',
  imports: [CommonModule],
  templateUrl: './stock.component.html'
})
export class StockComponent implements OnInit {

  stock: any[] = [];

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadStock();
  }

  loadStock() {
    this.api.getStock().subscribe((data: any) => {
      this.stock = data;
      this.cdr.detectChanges();
    });
  }
}