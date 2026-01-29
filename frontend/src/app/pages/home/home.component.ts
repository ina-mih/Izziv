import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import NProgress from 'nprogress';
import { ToastrService, ToastrModule } from 'ngx-toastr';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';

NProgress.configure({ showSpinner: false });

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ToastrModule, ButtonModule, ToolbarModule,  PanelMenuModule, CardModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private toastr: ToastrService) {}
  
  menuItems = [
    { label: 'Articles', icon: 'pi pi-file', command: () => this.navigateTo('articles') },
    { label: 'Locations', icon: 'pi pi-map', command: () => this.navigateTo('locations') },
    { label: 'Stock', icon: 'pi pi-box', command: () => this.navigateTo('stock') },
    { label: 'Documents', icon: 'pi pi-folder', command: () => this.navigateTo('documents') },
    { label: 'Drafts', icon: 'pi pi-pencil', command: () => this.navigateTo('drafts') }
  ];

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    NProgress.start();
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    NProgress.done();
    this.toastr.success('Logged out successfully', 'Logout');
  }
  
}