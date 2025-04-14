import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { YoutubeApiService } from '@app/core/services/youtube-api.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { YoutubeVideoItem } from '@app/shared/models/youtube-search-response.models';

@Component({
  selector: 'app-video-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
})
export class VideoDetailsComponent implements OnInit {
  video!: YoutubeVideoItem;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private youtubeApi: YoutubeApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.youtubeApi.getVideoDetails([id]).subscribe((res) => {
      this.video = res[0];
      this.isFavorite = localStorage.getItem(`fav_${id}`) === 'true';
    });
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    localStorage.setItem(`fav_${this.video.id}`, String(this.isFavorite));
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
