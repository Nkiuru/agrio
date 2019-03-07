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
  private postsArray: Post[];
  private profilePicArray: Post[];

  constructor(private http: HttpClient, private event: Events) {}

  initData() {
    const postsData = this.http.get<Post[]>(API_MEDIA, this.mediaParams(0, 1));
    const profilePicData = this.http.get<Post[]>(API_TAGS + 'profile');

    forkJoin([postsData, profilePicData])
    .subscribe( resList => {
      console.log('Posts data: ', resList[0]);
      this.postsArray = resList[0];
      this.profilePicArray = resList[1];

      this.postsArray.forEach(async post => {
        this.appendProfilePicToPostData(post.user_id, post.file_id);
        await this.getUserDetails(post.user_id, post.file_id);
      });

      console.log('Updated posts array: ', this.postsArray);
      this.event.publish(EVENT_MEDIA_ARRAY_UPDATE, this.postsArray);
    });

  }

  getPostsSegment(start = 0, limit = 20) {
    this.http.get<Post[]>(API_MEDIA, this.mediaParams(start, limit)).subscribe(
      res => {
        console.log(res);
        this.postsArray = res;
        this.event.publish(EVENT_MEDIA_ARRAY_UPDATE, this.postsArray);
      },
      err => {
        console.log(err.message);
        console.log(err);
      }
    );
  }

  private appendProfilePicToPostData(userid: number, fileid: number) {
    const profilePic = this.profilePicArray.filter(pic => pic.user_id === userid);
    if (profilePic.length >= 1) {
      const updatedPost = {
        ...this.postsArray.filter(post => post.file_id === fileid)[0],
        profile_pic: profilePic[0].filename
      };
      const i = this.postsArray.findIndex(post => post.file_id === fileid);
      this.postsArray[i] = updatedPost;
    }
  }

  private getUserDetails(userid: number, fileid: number) {
    this.http
      .get<User>(API_USERS + userid, this.requestToken())
      .subscribe(res => {
        const updatedPost: Post = {
          ...this.postsArray.filter(post => post.file_id === fileid)[0],
          ...res
        };
        const i = this.postsArray.findIndex(post => post.file_id === fileid);
        this.postsArray[i] = updatedPost;
      }, err => {
        console.log(err);
      });
  }

  // getProfilePic(userid: number) {
  //   return this.profilePicArray
  //     .filter(post => post.user_id === userid)
  //     .map(post => post.filename)[0];
  // }

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

  getPostById(fileid: number) {
    return this.postsArray.filter(post => post.file_id === fileid)[0];
  }
}
