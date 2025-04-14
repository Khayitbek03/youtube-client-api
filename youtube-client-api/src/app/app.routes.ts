import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SearchResultsComponent } from './features/search/search-results/search-results.component';
import { VideoDetailsComponent } from './features/details/video-details/video-details.component';
import { FavoritesComponent } from './features/favorites/favorites/favorites.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: SearchResultsComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin', canActivate: [authGuard], component: AdminComponent },
  {
    path: 'details/:id',
    canActivate: [authGuard],
    component: VideoDetailsComponent,
  },
  {
    path: 'favorites',
    canActivate: [authGuard],
    component: FavoritesComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
