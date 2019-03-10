import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { MediaService } from 'src/app/media.service';
import { User } from 'src/app/interfaces/user';
import { API_UPLOADS, EVENT_SINGLE_MEDIA_UPDATE } from '../../app-constants';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-media-item-card',
  templateUrl: './media-item-card.component.html',
  styleUrls: ['./media-item-card.component.scss']
})
export class MediaItemCardComponent implements OnInit {
  @Input() postId: number;

  uploadsUrl = API_UPLOADS;
  postImageUrl: string;
  postLiked: boolean;
  post: Post;

  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(private media: MediaService, private router: Router) {
  }

  ngOnInit() {
    this.post = this.media.getPostById(this.postId);

    // This bit is nesessary to keep the media item component like animation working
    const newLikeState = this.post.favourites.filter(fav => fav.user_id === this.user.user_id).length > 0;
    const oldLikeState = ! newLikeState;
    this.postLiked = oldLikeState;
    setTimeout(() => {
      this.postLiked = newLikeState;
    }, 10);
  }

  onLike() {
    if ( this.postLiked ) {
      this.media.removeLike(this.post.file_id);
    } else {
      this.media.addLike(this.post.file_id);
    }
  }

  openProfile(userid: number) {
    this.router.navigate(['user/' + userid]).catch((err) => console.log(err));
  }

  getProfilePic(userid: number) {
    const url = this.uploadsUrl + this.media.getProfilePic(userid);
    console.log('profile pic url: ', url);
    return url;
  }

}
