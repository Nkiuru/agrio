import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Post } from './interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  mediaUrl = 'http://media.mw.metropolia.fi/wbma/media';

  constructor(private http: HttpClient) { }

  getMediaInSegments(start = 0, limit = 20) {
    return this.http.get<Post[]>(this.mediaUrl, this.mediaParams(start, limit));
  }

  private mediaParams(start: number, limit: number) {
    return {
      params: new HttpParams()
        .set('start', start.toString())
        .set('limit', limit.toString())
    };
  }
}
