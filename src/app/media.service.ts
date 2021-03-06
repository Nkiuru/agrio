import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './interfaces/post';
import { Events } from '@ionic/angular';
import {
  API_TAGS,
  API_MEDIA,
  API_USERS,
  EVENT_MEDIA_ARRAY_UPDATE,
  API_COMMENTS,
  EVENT_SINGLE_MEDIA_UPDATE,
  EVENT_COMMENT_DATA_UPDATE,
  EVENT_PROFILE_PIC_ARRAY_UPDATE,
  API_MEDIA_USER,
  EVENT_USER_MEDIA_ARRAY_UPDATE,
  API_FAVOURITES,
  EVENT_LIKED_ARRAY_UPDATE, EVENT_TAG_ARRAY_UPDATE
} from './app-constants';
import { User } from './interfaces/user';
import { forkJoin, Observable } from 'rxjs';
import { Favourites } from './interfaces/favourites';
import { Comment } from './interfaces/comment';
import { Tag } from './interfaces/tags';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private postsArray: Post[];
  private profilePostsArray: Post[];
  private profilePicArray: Post[];
  private likedPostsArray: Post[];
  private tagPostsArray: Post[];
  private completeDetailsFetched = 0;
  private completeDetailsFetchedForProfile = 0;
  private completeDetailsFetchedForLikes = 0;
  private completeDetailsFetchedForTags = 0;

  private limit = 5;

  constructor(private http: HttpClient, private event: Events) {
  }

  initData() {
    const postsData = this.http.get<Post[]>(API_TAGS + 'agrio');
    const profilePicData = this.http.get<Post[]>(API_TAGS + 'profile');

    forkJoin([postsData, profilePicData]).subscribe(resList => {
      console.log('Posts data: ', resList[0]);
      this.postsArray = resList[0].reverse();
      this.profilePicArray = resList[1];

      this.completeDetailsFetched = 0;
      this.postsArray.forEach(post => {
        this.getCompleteDataForPost(post.file_id, post.user_id);
      });
    });
  }

  private getCompleteDataForPost(fileid: number, userid: number, profilePost = false, likedPost = false, tagPost = false) {

    const userDetailsData = this.http.get<User>(API_USERS + userid, this.requestToken());
    const postLikesData = this.http.get<Favourites[]>(API_FAVOURITES + 'file/' + fileid);
    const postCommentsData = this.http.get<Comment[]>(API_COMMENTS + 'file/' + fileid);
    const postTagsData = this.http.get<Tag[]>(API_TAGS + 'file/' + fileid);

    forkJoin([
      userDetailsData,
      postLikesData,
      postCommentsData,
      postTagsData
    ]).subscribe(resList => {

      if (profilePost) {

        let profilePic: any = this.profilePicArray.filter(pic => pic.user_id === userid)[0];
        if (!profilePic) {
          profilePic = { filename: null };
        }

        const updatedPost = {
          ...this.profilePostsArray.filter(post => post.file_id === fileid)[0],
          ...resList[0],
          profile_pic: profilePic.filename,
          favourites: resList[1],
          comments: resList[2],
          tags: resList[3]
        };

        const i = this.profilePostsArray.findIndex(post => post.file_id === fileid);
        this.profilePostsArray[i] = updatedPost;

        // Check if all the missing data has been loaded into posts array
        // and publish an event to upadte data in components
        this.completeDetailsFetchedForProfile++;
        if (this.profilePostsArray.length === this.completeDetailsFetchedForProfile) {
          console.log('Updated posts array: ', this.postsArray);
          this.event.publish(EVENT_USER_MEDIA_ARRAY_UPDATE, this.profilePostsArray);
        }

      } else if (likedPost) {

        let profilePic: any = this.profilePicArray.filter(pic => pic.user_id === userid)[0];
        if (!profilePic) {
          profilePic = { filename: null };
        }

        const updatedPost = {
          ...this.likedPostsArray.filter(post => post.file_id === fileid)[0],
          ...resList[0],
          profile_pic: profilePic.filename,
          favourites: resList[1],
          comments: resList[2],
          tags: resList[3]
        };

        const i = this.likedPostsArray.findIndex(post => post.file_id === fileid);
        this.likedPostsArray[i] = updatedPost;

        // Check if all the missing data has been loaded into posts array
        // and publish an event to update data in components
        this.completeDetailsFetchedForLikes++;
        if (this.likedPostsArray.length === this.completeDetailsFetchedForLikes) {
          console.log('Updated liked posts array: ', this.likedPostsArray);
          this.event.publish(EVENT_LIKED_ARRAY_UPDATE, this.likedPostsArray);
        }
      } else if (tagPost) {

        let profilePic: any = this.profilePicArray.filter(pic => pic.user_id === userid)[0];
        if (!profilePic) {
          profilePic = { filename: null };
        }

        const updatedPost = {
          ...this.tagPostsArray.filter(post => post.file_id === fileid)[0],
          ...resList[0],
          profile_pic: profilePic.filename,
          favourites: resList[1],
          comments: resList[2],
          tags: resList[3]
        };

        const i = this.tagPostsArray.findIndex(post => post.file_id === fileid);
        this.tagPostsArray[i] = updatedPost;

        // Check if all the missing data has been loaded into posts array
        // and publish an event to update data in components
        this.completeDetailsFetchedForTags++;
        if (this.tagPostsArray.length === this.completeDetailsFetchedForTags) {
          console.log('Updated tag posts array: ', this.tagPostsArray);
          this.event.publish(EVENT_TAG_ARRAY_UPDATE, this.tagPostsArray);
        }
      } else {

        let profilePic: any = this.profilePicArray.filter(pic => pic.user_id === userid)[0];
        if (!profilePic) {
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

        const i = this.postsArray.findIndex(post => post.file_id === fileid);
        this.postsArray[i] = updatedPost;

        // Check if all the missing data has been loaded into posts array
        // and publish an event to upadte data in components
        this.completeDetailsFetched++;
        if (this.postsArray.length === this.completeDetailsFetched) {
          const postArrayCopy = this.postsArray.map(post => post);
          console.log('Updated posts array: ', this.postsArray);
          console.log('posts array copy: ', postArrayCopy);
          this.event.publish(EVENT_MEDIA_ARRAY_UPDATE, postArrayCopy);
        }

      }
    });
  }

  initLikedData() {
    const requests = [];
    requests.push(this.http.get<Post[]>(API_FAVOURITES, this.requestToken()));
    if (!this.profilePicArray) {
      requests.push(this.http.get<Post[]>(API_TAGS + 'profile'));
    }
    forkJoin(requests).subscribe(res => {
      console.log('Init liked data: ', res);
      const ids = res[0];
      if (res.length > 1) {
        this.profilePicArray = res[1];
      }
      const promises = [];
      this.completeDetailsFetchedForLikes = 0;
      ids.forEach(post => {
        promises.push(this.http.get(API_MEDIA + post.file_id, this.requestToken()).toPromise());
      });
      Promise.all(promises).then(data => {
        this.likedPostsArray = data.reverse();
        this.likedPostsArray.forEach(post => {
          this.getCompleteDataForPost(post.file_id, post.user_id, false, true);
        });
      });
    });
  }

  initTagPosts(tag: string) {
    const requests = [];
    requests.push(this.http.get<Post[]>(API_TAGS + tag, this.requestToken()));
    if (!this.profilePicArray) {
      requests.push(this.http.get<Post[]>(API_TAGS + 'profile'));
    }
    forkJoin(requests).subscribe((data) => {
      this.tagPostsArray = data[0].reverse();
      if (data.length > 1) {
        this.profilePicArray = data[1];
      }
      this.completeDetailsFetchedForTags = 0;
      this.tagPostsArray.forEach((post) => {
        this.getCompleteDataForPost(post.file_id, post.user_id, false, false, true);
      });
    });
  }

  nextPostsSegment() {
    const start = this.postsArray.length;
    this.http
      .get<Post[]>(API_MEDIA, this.mediaParams(start, this.limit))
      .subscribe(
        res => {

          console.log(res);
          this.postsArray.push(...res);
          res.forEach(post => {
            this.getCompleteDataForPost(post.file_id, post.user_id);
          });

        },
        err => {
          console.log(err.message);
          console.log(err);
        }
      );
  }

  addLike(fileid: number) {
    const data = {
      'file_id': fileid
    };
    this.http.post(API_FAVOURITES, data, this.requestToken()).subscribe(res => {
        console.log(res);
        this.http.get<Favourites[]>(API_FAVOURITES + 'file/' + fileid).subscribe(favouritesData => {

          const updatedPost = {
            ...this.postsArray.filter(post => post.file_id === fileid)[0],
            favourites: favouritesData
          };

          this.event.publish(EVENT_SINGLE_MEDIA_UPDATE, updatedPost);

          const i = this.postsArray.findIndex(post => post.file_id === fileid);
          this.postsArray[i] = updatedPost;

        });
      },
      err => {
        console.log(err);
      });
  }

  removeLike(fileid: number) {
    this.http.delete(API_FAVOURITES + 'file/' + fileid, this.requestToken()).subscribe(res => {
        console.log(res);
        this.http.get<Favourites[]>(API_FAVOURITES + 'file/' + fileid).subscribe(favouritesData => {

          const updatedPost = {
            ...this.postsArray.filter(post => post.file_id === fileid)[0],
            favourites: favouritesData
          };

          this.event.publish(EVENT_SINGLE_MEDIA_UPDATE, updatedPost);

          const i = this.postsArray.findIndex(post => post.file_id === fileid);
          this.postsArray[i] = updatedPost;

        });
      },
      err => {
        console.log(err);
      });
  }

  postNewComment(fileid: number, comment: string) {
    const data = {
      file_id: fileid,
      comment: comment
    };
    this.http.post(API_COMMENTS, data, this.requestToken()).subscribe(
      res => {
        console.log(res);
        this.http.get<Comment[]>(API_COMMENTS + 'file/' + fileid).subscribe(commentsData => {

          const updatedPost = {
            ...this.postsArray.filter(post => post.file_id === fileid)[0],
            comments: commentsData
          };

          this.event.publish(EVENT_SINGLE_MEDIA_UPDATE, updatedPost);

          const i = this.postsArray.findIndex(post => post.file_id === fileid);
          this.postsArray[i] = updatedPost;

        });
      },
      err => {
        console.log(err);
        this.event.publish(EVENT_SINGLE_MEDIA_UPDATE, null);
      }
    );
  }

  initProfileData(userid: number) {
    const requests = [];
    requests.push(this.http.get<Post[]>(API_MEDIA_USER + userid, this.requestToken()));
    if (!this.profilePicArray) {
      requests.push(this.http.get<Post[]>(API_TAGS + 'profile'));
    }
    forkJoin(requests).subscribe(res => {
      console.log('Init profile data: ', res);
      this.profilePostsArray = res[0].reverse();
      if (res.length > 1) {
        this.profilePicArray = res[1];
      }
      this.completeDetailsFetchedForProfile = 0;
      this.profilePostsArray.forEach(post => {
        this.getCompleteDataForPost(post.file_id, post.user_id, true);
      });
      // this.event.publish(EVENT_USER_MEDIA_ARRAY_UPDATE, this.postsArray);

      // console.log(resList[1]);
      // this.profilePicArray = resList[1];
      // this.event.publish(EVENT_PROFILE_PIC_ARRAY_UPDATE, this.profilePicArray);
    });
  }

  initProfilePicture() {
    return this.http.get<Post[]>(API_TAGS + 'profile');
  }

  getPostsSegment(start = 0, limit = 20) {
    this.http.get<Post[]>(API_MEDIA, this.mediaParams(start, limit)).subscribe();

  }

  getUserDetails(userid: number) {
    return this.http.get<User>(API_USERS + userid, this.requestToken());
  }

  getProfilePic(userid: number) {
    if (!this.profilePicArray) {
      this.initProfilePicture().subscribe(data => {
        this.profilePicArray = data;
        return this.profilePicArray
          .filter(post => post.user_id === userid)
          .map(post => post.filename)[0];
      });
    } else {
      return this.profilePicArray
        .filter(post => post.user_id === userid)
        .map(post => post.filename)[0];
    }
  }

  getProfilePicId(userid: number) {
    if (!this.profilePicArray) {
      return;
    }
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

  getProfilePostById(fileid: number) {
    console.log('get profile post by id');
    if (!this.profilePostsArray) {
      return;
    }
    return this.profilePostsArray.filter(post => post.file_id === fileid)[0];
  }

  getPostById(fileid: number) {
    if (!this.postsArray) {
      this.initData();
      return;
    }
    return this.postsArray.filter(post => post.file_id === fileid)[0];
  }

  getLikedPostById(fileid: number) {
    if (!this.likedPostsArray) {
      return;
    }
    return this.likedPostsArray.filter(post => post.file_id === fileid)[0];
  }

  getTagPostById(fileid: number) {
    if (!this.tagPostsArray) {
      return;
    }
    return this.tagPostsArray.filter(post => post.file_id === fileid)[0];
  }

  getProfilePicById(userid: number): string {
    console.log(this.profilePicArray);
    if (!this.profilePicArray) {
      return;
    }
    const filename = this.profilePicArray.filter(pic => pic.user_id === userid)[0];
    if (filename) {
      return filename.filename;
    } else {
      return '';
    }
  }

  getUserinfoForComment(userid: number) {
    return this.http.get<User>(API_USERS + userid, this.requestToken());
  }
}
