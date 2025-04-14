import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchItemComponent } from '../search-item/search-item.component';
import { YoutubeVideoItem } from '@app/shared/models/youtube-search-response.models';
import { SearchService } from '@app/core/services/search.service';
import { HeaderComponent } from '@app/shared/header/header.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, SearchItemComponent, HeaderComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  videos: YoutubeVideoItem[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.result$.subscribe((res) => {
      this.videos = res;
      console.log('Videos received in SearchResultsComponent:', res);
    });
  }
}
