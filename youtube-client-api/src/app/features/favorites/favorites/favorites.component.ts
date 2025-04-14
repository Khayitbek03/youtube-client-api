import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeApiService } from '@app/core/services/youtube-api.service';
import { YoutubeVideoItem } from '@app/shared/models/youtube-search-response.models';
import { SearchItemComponent } from '@app/features/search/search-item/search-item.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, SearchItemComponent, MatIconModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favoriteVideos: YoutubeVideoItem[] = [];
  router = inject(Router);
  constructor(private youtubeApi: YoutubeApiService) {}

  ngOnInit(): void {
    const storedKeys = Object.keys(localStorage).filter(
      (key) => key.startsWith('fav_') && localStorage.getItem(key) === 'true'
    );
    const ids = storedKeys.map((key) => key.replace('fav_', ''));

    if (ids.length) {
      this.youtubeApi.getVideoDetails(ids).subscribe((videos) => {
        this.favoriteVideos = videos;
      });
    }
  }
  goBack(): void {
    this.router.navigate(['/']);
  }
}
