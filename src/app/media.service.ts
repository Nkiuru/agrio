import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './interfaces/post';
import { Events } from '@ionic/angular';
import {
  API_TAGS,
  API_MEDIA,
  API_USERS,
  EVENT_MEDIA_ARRAY_UPDATE,
  EVENT_PROFILE_PIC_ARRAY_UPDATE
} from './app-constants';
import { User } from './interfaces/user';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private postArray: Post[];
  private profilePicArray: Post[];

  constructor(private http: HttpClient, private event: Events) {
  }

  initData() {
    const postsData = this.http.get<Post[]>(API_MEDIA, this.mediaParams(0, 20));
    const profilePicData = this.http.get<Post[]>(API_TAGS + 'profile');

    forkJoin([postsData, profilePicData]).subscribe(resList => {
      console.log(resList[0]);
      this.postArray = resList[0];
      this.event.publish(EVENT_MEDIA_ARRAY_UPDATE, this.postArray);

      console.log(resList[1]);
      this.profilePicArray = resList[1];
      this.event.publish(EVENT_PROFILE_PIC_ARRAY_UPDATE, this.profilePicArray);
    });
  }

  getPostsSegment(start = 0, limit = 20) {
    this.http.get<Post[]>(API_MEDIA, this.mediaParams(start, limit)).subscribe(
      res => {
        console.log(res);
        this.postArray = res;
        this.event.publish(EVENT_MEDIA_ARRAY_UPDATE, this.postArray);
      },
      err => {
        console.log(err.message);
        console.log(err);
      }
    );
  }

  getUserDetails(userid: number) {
    return this.http.get<User>(API_USERS + userid, this.requestToken());
  }

  getProfilePic(userid: number) {
    return this.profilePicArray
      .filter(post => post.user_id === userid)
      .map(post => post.filename)[0];
  }

  getProfilePicId(userid: number) {
    return this.profilePicArray
      .filter(post => post.user_id === userid)
      .map(post => post.file_id)[0];
  }

  private mediaParams(start: number, limit: number) {
    return {
      params: new HttpParams()
        .set('start', start.toString())
        .set('limit', limit.toString())
    };
  }

  private requestToken() {
    return {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })
    };
  }

  getPostArray() {
    return this.postArray;
  }
}
