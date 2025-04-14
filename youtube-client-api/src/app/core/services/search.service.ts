import { Injectable } from '@angular/core';
import { YoutubeVideoItem } from '@app/shared/models/youtube-search-response.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private resultSubject = new BehaviorSubject<YoutubeVideoItem[]>([]);
  result$ = this.resultSubject.asObservable();
  updateResults(videos: YoutubeVideoItem[]) {
    this.resultSubject.next(videos);
  }
}
