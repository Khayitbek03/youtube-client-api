import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import {
  YoutubeSearchResponse,
  YoutubeVideoItem,
} from '@app/shared/models/youtube-search-response.models';

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  private readonly BASE_URL = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  searchVideos(query: string): Observable<YoutubeSearchResponse> {
    const params = new HttpParams()
      .set('key', environment.YOUTUBE_API_KEY)
      .set('type', 'video')
      .set('part', 'snippet')
      .set('maxResults', '15')
      .set('q', query);

    return this.http.get<YoutubeSearchResponse>(`${this.BASE_URL}/search`, {
      params,
    });
  }
  getVideoDetails(ids: string[]): Observable<YoutubeVideoItem[]> {
    const params = new HttpParams()
      .set('key', environment.YOUTUBE_API_KEY)
      .set('part', 'snippet,statistics')
      .set('id', ids.join(','));

    return this.http
      .get<{ items: YoutubeVideoItem[] }>(`${this.BASE_URL}/videos`, { params })
      .pipe(map((res) => res.items));
  }
}
