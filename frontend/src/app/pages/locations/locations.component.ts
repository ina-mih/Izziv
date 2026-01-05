import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './locations.component.html'
})
export class LocationsComponent implements OnInit {

  locations: any[] = [];

  form = {
    id: null,
    code: '',
    name: ''
  };

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations() {
    this.api.getLocations().subscribe((data: any) => {
      this.locations = data;
      this.cdr.detectChanges();
    });
  }

  submit() {
    if (this.form.id) {
      this.api.updateLocation(this.form.id, this.form).subscribe(() => {
        this.reset();
        this.loadLocations();
      });
    } else {
      this.api.createLocation(this.form).subscribe(() => {
        this.reset();
        this.loadLocations();
      });
    }
  }

  edit(location: any) {
    this.form = { ...location };
  }

  delete(id: number) {
    if (confirm('Delete this location?')) {
      this.api.deleteLocation(id).subscribe(() => {
        this.loadLocations();
      });
    }
  }

  reset() {
    this.form = {
      id: null,
      code: '',
      name: ''
    };
  }
}