import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-stock',
  imports: [CommonModule, ReactiveFormsModule,
    InputNumberModule, ButtonModule, TableModule, CardModule, RippleModule, FloatLabelModule
  ],
  templateUrl: './stock.component.html'
})
export class StockComponent implements OnInit {

  stock: any[] = [];
  stockForms!: FormArray;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadStock();
  }

  loadStock() {
    this.api.getStock().subscribe((data: any) => {
      const stockArray = data as any[];
      this.stock = stockArray;

      this.stockForms = this.fb.array(
        data.map((s: { 
          article_id: number; 
          location_id: number; 
          quantity: number; 
          article: string; 
          location: string; 
        }) =>
          this.fb.group({
            article_id: [s.article_id],
            location_id: [s.location_id],
            quantity: [null, [Validators.required, Validators.min(0)]]
          })
        )
      );
      console.log('Loaded stock data:', this.stock);
      this.cdr.detectChanges();
    });
  }

  getQuantityControl(index: number): FormControl {
    return this.stockForms.at(index).get('quantity') as FormControl;
  }

  updateStock(index: number) {
    const form = this.stockForms.at(index) as FormGroup;
    if (form.invalid) {
      alert('Enter a valid quantity');
      return;
    }

    const payload = {
      article_id: form.value.article_id,
      location_id: form.value.location_id,
      quantity: form.value.quantity
    };
    this.api.updateStock(payload).subscribe({
      next: () => {
        this.stock[index].quantity = form.value.quantity;
        form.get('quantity')?.reset(null);
        form.markAsPristine();
        form.markAsUntouched();
        this.cdr.detectChanges();
      },
      error: err => {
        console.error(err);
        alert('Failed to update stock');
      }
    });
  }
}
