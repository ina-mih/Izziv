import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { StockComponent } from './pages/stock/stock.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { DraftsComponent } from './pages/drafts/drafts.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'articles', component: ArticlesComponent},
  { path: 'locations', component: LocationsComponent },
  { path: 'stock', component: StockComponent, },
  { path: 'documents', component: DocumentsComponent },
  { path: 'drafts', component: DraftsComponent },
  { path: 'register', component: RegisterComponent }
];