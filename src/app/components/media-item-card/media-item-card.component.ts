import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { MediaService } from 'src/app/media.service';
import { User } from 'src/app/interfaces/user';
import { API_UPLOADS } from '../../app-constants';

@Component({
  selector: 'app-media-item-card',
  templateUrl: './media-item-card.component.html',
  styleUrls: ['./media-item-card.component.scss']
})
export class MediaItemCardComponent implements OnInit {
  @Input() postId: number;

  uploadsUrl = API_UPLOADS;
  postImageUrl: string;
  postLiked = false;
  post: Post;

  user: User;

  constructor(private media: MediaService) {}

  ngOnInit() {
    this.post = this.media.getPostById(this.postId);

    this.user = JSON.parse(localStorage.getItem('user'));
    const myUserId: number = this.user.user_id;
    if ( this.post.favourites.filter(fav => fav.user_id === myUserId).length > 0 ) {
      this.postLiked = true;
    }
  }

  ionViewDidEnter() {
  }

  onLike() {
    console.log('like clicked');
    this.postLiked = !this.postLiked;
  }

}
