import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { PublishedDateColorDirective } from '@app/shared/directives/published-date-color.directive';
import { YoutubeVideoItem } from '@app/shared/models/youtube-search-response.models';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    PublishedDateColorDirective,
    RouterModule,
  ],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
})
export class SearchItemComponent {
  @Input() video!: YoutubeVideoItem;

  getVideoId(video: YoutubeVideoItem): string {
    return typeof video.id === 'string' ? video.id : video.id.videoId;
  }
}
