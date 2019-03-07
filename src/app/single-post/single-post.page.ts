import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { StatusBarService } from '../status-bar.service';
import { MediaService } from '../media.service';
import { ActivatedRoute } from '@angular/router';
import { API_UPLOADS } from '../app-constants';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.page.html',
  styleUrls: ['./single-post.page.scss']
})
export class SinglePostPage implements OnInit {
  postLiked = false;
  postId: number;
  post: Post;

  user: User;

  uploadsUrl = API_UPLOADS;

  constructor(
    private statusBar: StatusBarService,
    private media: MediaService,
    private route: ActivatedRoute
  ) {
    this.postId = +this.route.snapshot.paramMap.get('postid');
  }

  ngOnInit() {
    this.post = this.media.getPostById(this.postId);

    this.user = JSON.parse(localStorage.getItem('user'));
    const myUserId: number = this.user.user_id;
    if ( this.post.favourites.filter(fav => fav.user_id === myUserId).length > 0 ) {
      this.postLiked = true;
    }
  }

  ionViewWillEnter() {
    this.statusBar.setToLight();
  }

  onLike() {
    this.postLiked = !this.postLiked;
  }
}
