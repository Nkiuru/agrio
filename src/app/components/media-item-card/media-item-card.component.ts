import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { MediaService } from 'src/app/media.service';
import { User } from 'src/app/interfaces/user';
import { API_UPLOADS, EVENT_SINGLE_MEDIA_UPDATE, RECIPE_POST, PICTURE_POST, STATUS_POST } from '../../app-constants';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { Description } from 'src/app/interfaces/description';


@Component({
  selector: 'app-media-item-card',
  templateUrl: './media-item-card.component.html',
  styleUrls: ['./media-item-card.component.scss']
})
export class MediaItemCardComponent implements OnInit {
  @Input() postId: number;
  @Input() profileItem: boolean;
  @Input() likedItem: boolean;
  @Input() tagItem: boolean;

  type = {
    recipe: RECIPE_POST,
    picture: PICTURE_POST,
    status: STATUS_POST
  };
  uploadsUrl = API_UPLOADS;
  postImageUrl: string;
  postLiked: boolean;
  post: Post;
  params = {};
  postMeta: Description;
  agrioPost: boolean;

  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(private media: MediaService, private router: Router) {
  }

  ngOnInit() {
    if (this.profileItem) {
      this.post = this.media.getProfilePostById(this.postId);
      this.params = {
        profilePost: true
      };
    } else if (this.likedItem) {
      this.post = this.media.getLikedPostById(this.postId);
      this.params = {
        likedPost: true
      };
    } else if (this.tagItem) {
      this.post = this.media.getTagPostById(this.postId);
      this.params = {
        tagPost: true
      };
    } else {
      this.post = this.media.getPostById(this.postId);
    }

    // This bit is nesessary to keep the media item component like animation working
    const newLikeState = this.post.favourites.filter(fav => fav.user_id === this.user.user_id).length > 0;
    const oldLikeState = !newLikeState;
    this.postLiked = oldLikeState;
    setTimeout(() => {
      this.postLiked = newLikeState;
    }, 10);

    try {
      this.postMeta = <Description>JSON.parse(this.post.description);
      this.agrioPost = this.postMeta.hasOwnProperty('content');
    } catch (e) {
      this.agrioPost = false;
    }
  }

  onLike() {
    if (this.postLiked) {
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
