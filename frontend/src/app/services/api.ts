import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/articles`);
  }

  createArticle(data: any) {
    return this.http.post(`${this.baseUrl}/articles`, data);
  }

  updateArticle(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/articles/${id}`, data);
  }

  deleteArticle(id: number) {
    return this.http.delete(`${this.baseUrl}/articles/${id}`);
  }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/locations`);
  }

  createLocation(data: any) {
    return this.http.post(`${this.baseUrl}/locations`, data);
  }

  updateLocation(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/locations/${id}`, data);
  }

  deleteLocation(id: number) {
    return this.http.delete(`${this.baseUrl}/locations/${id}`);
  }

  getStock() {
    return this.http.get(`${this.baseUrl}/stock`);
  }

  createDocument(data: any) {
    return this.http.post(`${this.baseUrl}/documents`, data);
  }

  addDocumentItem(docId: number, data: any) {
    return this.http.post(`${this.baseUrl}/documents/${docId}/items`, data);
  }

  confirmDocument(docId: number) {
    return this.http.post(`${this.baseUrl}/documents/${docId}/confirm`, {});
  }

  getDocuments() {
    return this.http.get(`${this.baseUrl}/documents`);
  }

  register(email: string, password: string) {
    return this.http.post(
      `${this.baseUrl}/auth/register`,
      { email, password }
    );
  }

}