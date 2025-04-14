import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

import { YoutubeApiService } from '@app/core/services/youtube-api.service';
import { SearchService } from '@app/core/services/search.service';
import { YoutubeVideoItem } from '@app/shared/models/youtube-search-response.models';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  query = '';
  isLoggedIn$: Observable<boolean> | undefined;
  private searchSubject = new Subject<string>();
  showSettings = false;
  wordFilter = '';
  allResults: YoutubeVideoItem[] = [];
  searchForm: any;

  constructor(
    private youtubeApi: YoutubeApiService,
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) =>
          this.youtubeApi.searchVideos(query).pipe(
            switchMap((res) => {
              const ids = res.items.map((item) =>
                typeof item.id === 'string' ? item.id : item.id.videoId
              );
              return this.youtubeApi.getVideoDetails(ids);
            })
          )
        )
      )
      .subscribe({
        next: (detailedItems) => {
          this.allResults = detailedItems;
          this.searchService.updateResults(detailedItems);
        },
        error: (err) => {
          console.error('YouTube API error:', err);
        },
      });
  }

  sortBy(type: 'dateAsc' | 'dateDesc' | 'viewsAsc' | 'viewsDesc'): void {
    if (!this.allResults.length) return;

    const sorted = [...this.allResults];

    switch (type) {
      case 'dateAsc':
        sorted.sort(
          (a, b) =>
            new Date(a.snippet.publishedAt).getTime() -
            new Date(b.snippet.publishedAt).getTime()
        );
        break;

      case 'dateDesc':
        sorted.sort(
          (a, b) =>
            new Date(b.snippet.publishedAt).getTime() -
            new Date(a.snippet.publishedAt).getTime()
        );
        break;

      case 'viewsAsc':
        sorted.sort(
          (a, b) =>
            Number(a.statistics?.viewCount || 0) -
            Number(b.statistics?.viewCount || 0)
        );
        break;

      case 'viewsDesc':
        sorted.sort(
          (a, b) =>
            Number(b.statistics?.viewCount || 0) -
            Number(a.statistics?.viewCount || 0)
        );
        break;
    }

    this.searchService.updateResults(sorted);
  }

  applyFilters(): void {
    const filtered = this.allResults.filter((video) =>
      video.snippet.title.toLowerCase().includes(this.wordFilter.toLowerCase())
    );

    this.searchService.updateResults(filtered);
  }

  toggleSettings(): void {
    this.showSettings = !this.showSettings;
  }

  onSearchClick(): void {
    if (this.query.trim().length < 3) return;

    this.authService.isLoggedIn$
      .subscribe((loggedIn) => {
        if (!loggedIn) return;

        this.searchSubject.next(this.query.trim());
      })
      .unsubscribe();
  }

  onSettingsClick(): void {
    this.toggleSettings();
  }
}
