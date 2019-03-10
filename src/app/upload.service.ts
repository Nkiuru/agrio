import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { API_MEDIA, API_TAGS } from './app-constants';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {
  }

  uploadFile(form) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      })
    };
    return this.http.post<any>(API_MEDIA, form, httpOptions);
  }

  addTag(fileId: number, tag: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      })
    };
    const body = {
      file_id: fileId,
      tag: tag,
    };
    return this.http.post<any>(API_TAGS, body, httpOptions);
  }

  deleteProfilePic(fileId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      })
    };
    return this.http.delete(API_MEDIA + fileId, httpOptions);
  }
}
