import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    InputTextModule, ButtonModule, CardModule, TableModule, RippleModule
  ],
  templateUrl: './locations.component.html'
})
export class LocationsComponent implements OnInit {

  locations: any[] = [];
  form!: FormGroup;

  constructor(
    private api: ApiService,
    private fb: FormBuilder, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });

    this.loadLocations();
  }

  loadLocations() {
    this.api.getLocations().subscribe((data: any) => {
      this.locations = data;
      this.cdr.detectChanges();
    });
  }

  submit() {
    if (this.form.invalid) return;
    
    if (this.form.value.id) {
      this.api.updateLocation(this.form.value.id, this.form.value).subscribe(() => {
        this.reset();
        this.loadLocations();
      });
    } else {
      this.api.createLocation(this.form.value).subscribe(() => {
        this.reset();
        this.loadLocations();
      });
    }
  }

  edit(location: any) {
    this.form.patchValue(location);
  }

  delete(id: number) {
    if (confirm('Delete this location?')) {
      this.api.deleteLocation(id).subscribe(() => {
        this.loadLocations();
      });
    }
  }

  reset() {
    this.form.reset();
  }

  get f() {
    return this.form.controls;
  }
}