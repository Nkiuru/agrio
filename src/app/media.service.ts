import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './interfaces/post';
import { Events } from '@ionic/angular';
import {
  API_TAGS,
  API_MEDIA,
  API_USERS,
  EVENT_MEDIA_ARRAY_UPDATE,
  API_FAVORITES,
  API_COMMENTS
} from './app-constants';
import { User } from './interfaces/user';
import { forkJoin } from 'rxjs';
import { Favourites } from './interfaces/favourites';
import { Comments } from './interfaces/comments';
import { Tag } from './interfaces/tags';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private postsArray: Post[];
  private profilePicArray: Post[];
  private completeDetailsFetched = 0;

  private limit = 5;

  constructor(private http: HttpClient, private event: Events) {}

  initData() {
    const postsData = this.http.get<Post[]>(API_MEDIA, this.mediaParams(0, this.limit));
    const profilePicData = this.http.get<Post[]>(API_TAGS + 'profile');

    forkJoin([postsData, profilePicData]).subscribe(resList => {
      console.log('Posts data: ', resList[0]);
      this.postsArray = resList[0];
      this.profilePicArray = resList[1];

      this.postsArray.forEach(post => {
        this.getCompleteDataForPost(post.file_id, post.user_id);
      });

    });
  }

  private getCompleteDataForPost(fileid: number, userid: number) {

    const userDetailsData  = this.http.get<User>(API_USERS + userid, this.requestToken());
    const postLikesData    = this.http.get<Favourites[]>(API_FAVORITES + 'file/' + fileid);
    const postCommentsData = this.http.get<Comments[]>(API_COMMENTS + 'file/' + fileid);
    const postTagsData     = this.http.get<Tag[]>(API_TAGS + 'file/' + fileid);

    forkJoin([userDetailsData, postLikesData, postCommentsData, postTagsData]).subscribe(resList => {

      let profilePic: any = this.profilePicArray.filter(pic => pic.user_id === userid)[0];
      if ( ! profilePic ) {
        profilePic = { filename: null };
      }

      const updatedPost = {
        ...this.postsArray.filter(post => post.file_id === fileid)[0],
        ...resList[0],
        profile_pic: profilePic.filename,
        favourites: resList[1],
        comments: resList[2],
        tags: resList[3]
      };
      console.log(updatedPost);

      const i = this.postsArray.findIndex(post => post.file_id === fileid);
      this.postsArray[i] = updatedPost;

      // Check if all the missing data has been loaded into posts array
      // and publish an event to upadte data in components
      this.completeDetailsFetched++;
      if (this.postsArray.length === this.completeDetailsFetched) {
        console.log('Updated posts array: ', this.postsArray);
        this.event.publish(EVENT_MEDIA_ARRAY_UPDATE, this.postsArray);
      }
    });
  }

  nextPostsSegment() {
    const start = this.postsArray.length;
    this.http.get<Post[]>(API_MEDIA, this.mediaParams(start, this.limit)).subscribe(
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
