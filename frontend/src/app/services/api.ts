import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import NProgress from 'nprogress';
import { ToastrService } from 'ngx-toastr';

NProgress.configure({ showSpinner: false });

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  private handleError(message: string) {
    return (err: any) => {
      this.toastr.error(err.error?.message || message);
      return throwError(() => err);
    };
  }

  login(data: any) {
    NProgress.start();
    return this.http.post(`${this.baseUrl}/auth/login`, data).pipe(
      tap(() => this.toastr.success('Logged in successfully')),
      catchError(this.handleError('Login failed')),
      finalize(() => NProgress.done())
    );
  }

  register(email: string, password: string) {
    NProgress.start();
    return this.http.post(`${this.baseUrl}/auth/register`, { email, password }).pipe(
      tap(() => this.toastr.success('Account created')),
      catchError(this.handleError('Registration failed')),
      finalize(() => NProgress.done())
    );
  }

  getArticles(): Observable<any[]> {
    NProgress.start();
    return this.http.get<any[]>(`${this.baseUrl}/articles`).pipe(
      catchError(this.handleError('Failed to load articles')),
      finalize(() => NProgress.done())
    );
  }

  createArticle(data: any) {
    NProgress.start();
    return this.http.post(`${this.baseUrl}/articles`, data).pipe(
      tap(() => this.toastr.success('Article created')),
      catchError(this.handleError('Failed to create article')),
      finalize(() => NProgress.done())
    );
  }

  updateArticle(id: number, data: any) {
    NProgress.start();
    return this.http.put(`${this.baseUrl}/articles/${id}`, data).pipe(
      tap(() => this.toastr.success('Article updated')),
      catchError(this.handleError('Failed to update article')),
      finalize(() => NProgress.done())
    );
  }

  deleteArticle(id: number) {
    NProgress.start();
    return this.http.delete(`${this.baseUrl}/articles/${id}`).pipe(
      tap(() => this.toastr.success('Article deleted')),
      catchError(this.handleError('Failed to delete article')),
      finalize(() => NProgress.done())
    );
  }

  getLocations(): Observable<any[]> {
    NProgress.start();
    return this.http.get<any[]>(`${this.baseUrl}/locations`).pipe(
      catchError(this.handleError('Failed to load locations')),
      finalize(() => NProgress.done())
    );
  }

  createLocation(data: any) {
    NProgress.start();
    return this.http.post(`${this.baseUrl}/locations`, data).pipe(
      tap(() => this.toastr.success('Location created')),
      catchError(this.handleError('Failed to create location')),
      finalize(() => NProgress.done())
    );
  }

  updateLocation(id: number, data: any) {
    NProgress.start();
    return this.http.put(`${this.baseUrl}/locations/${id}`, data).pipe(
      tap(() => this.toastr.success('Location updated')),
      catchError(this.handleError('Failed to update location')),
      finalize(() => NProgress.done())
    );
  }

  deleteLocation(id: number) {
    NProgress.start();
    return this.http.delete(`${this.baseUrl}/locations/${id}`).pipe(
      tap(() => this.toastr.success('Location deleted')),
      catchError(this.handleError('Failed to delete location')),
      finalize(() => NProgress.done())
    );
  }

  getStock() {
    NProgress.start();
    return this.http.get(`${this.baseUrl}/stock`).pipe(
      catchError(this.handleError('Failed to load stock')),
      finalize(() => NProgress.done())
    );
  }

  updateStock(payload: { article_id: number; location_id: number; quantity: number }) {
    NProgress.start();
    return this.http.patch(`${this.baseUrl}/stock/update`, payload).pipe(
      tap(() => this.toastr.success('Stock updated')),
      catchError(this.handleError('Failed to update stock')),
      finalize(() => NProgress.done())
    );
  }

  createDocument(data: any) {
    NProgress.start();
    return this.http.post(`${this.baseUrl}/documents`, data).pipe(
      finalize(() => NProgress.done())
    );
  }

  addDocumentItem(docId: number, data: any) {
    NProgress.start();
    return this.http.post(`${this.baseUrl}/documents/${docId}/items`, data).pipe(
      tap(() => this.toastr.success('Item added to document')),
      catchError(this.handleError('Failed to add item')),
      finalize(() => NProgress.done())
    );
  }

  confirmDocument(docId: number) {
    NProgress.start();
    return this.http.post(`${this.baseUrl}/documents/${docId}/confirm`, {}).pipe(
      tap(() => this.toastr.success('Document confirmed')),
      catchError(this.handleError('Failed to confirm document')),
      finalize(() => NProgress.done())
    );
  }

  getDocuments() {
    NProgress.start();
    return this.http.get(`${this.baseUrl}/documents`).pipe(
      catchError(this.handleError('Failed to load documents')),
      finalize(() => NProgress.done())
    );
  }
  
}