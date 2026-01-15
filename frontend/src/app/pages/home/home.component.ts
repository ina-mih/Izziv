import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import NProgress from 'nprogress';
import { ToastrService, ToastrModule } from 'ngx-toastr';

NProgress.configure({ showSpinner: false });

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ToastrModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private toastr: ToastrService) {}
  
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