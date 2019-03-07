import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { StatusBarService } from '../status-bar.service';
import { MediaService } from '../media.service';
import { ActivatedRoute } from '@angular/router';
import { API_UPLOADS } from '../app-constants';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.page.html',
  styleUrls: ['./single-post.page.scss']
})
export class SinglePostPage implements OnInit {
  postLiked = false;
  postId: number;
  post: Post;

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
  }

  ionViewWillEnter() {
    this.statusBar.setToLight();
  }

  onLike() {
    this.postLiked = !this.postLiked;
  }
}
