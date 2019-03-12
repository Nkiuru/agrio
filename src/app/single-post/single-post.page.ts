import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Post } from '../interfaces/post';
import { StatusBarService } from '../status-bar.service';
import { MediaService } from '../media.service';
import { ActivatedRoute } from '@angular/router';
import { API_UPLOADS, EVENT_SINGLE_MEDIA_UPDATE } from '../app-constants';
import { User } from '../interfaces/user';
import { Events, ToastController } from '@ionic/angular';
import { PostLocationComponent } from '../components/post-location/post-location.component';
import { Description } from '../interfaces/description';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.page.html',
  styleUrls: ['./single-post.page.scss']
})
export class SinglePostPage implements OnInit, OnDestroy {

  @ViewChild('commentModal') commentModal: ElementRef;
  @ViewChild('commentModalInput') commentModalInput: ElementRef;

  inputVal: string;
  showCommentModal = false;
  commentValid = false;
  postLiked = false;
  postId: number;
  post: Post;
  profilePost: boolean;
  showMap = false;
  showCoordinates = false;

  user: User = JSON.parse(localStorage.getItem('user'));

  uploadsUrl = API_UPLOADS;

  constructor(
    private statusBar: StatusBarService,
    private media: MediaService,
    private route: ActivatedRoute,
    private event: Events,
    private toast: ToastController,
  ) {
    this.postId = +this.route.snapshot.paramMap.get('postid');
    this.profilePost = this.route.snapshot.queryParamMap.get('profilePost') === 'true';

    this.event.subscribe(EVENT_SINGLE_MEDIA_UPDATE, updatedPostData => {
      if (updatedPostData) {
        this.post = updatedPostData;
        this.postLiked = this.post.favourites.filter(fav => fav.user_id === this.user.user_id).length > 0;
      } else {
        this.presentToast('Failed to post your comment.');
      }

      if ( this.showCommentModal ) {
        this.inputVal = '';
        this.dismissCommentModal();
      }

    });
  }

  ngOnInit() {
    if ( this.profilePost ) {
      this.post = this.media.getProfilePostById(this.postId);
    } else {
      this.post = this.media.getPostById(this.postId);
    }
    this.hasCoordinates();
    this.postLiked = this.post.favourites.filter(fav => fav.user_id === this.user.user_id).length > 0;
  }

  ionViewWillEnter() {
    this.statusBar.setToLight();
  }

  getProfilePic(): string {
    return this.media.getProfilePicById(this.user.user_id);
  }

  onLike() {
    if ( this.postLiked ) {
      this.media.removeLike(this.post.file_id);
    } else {
      this.media.addLike(this.post.file_id);
    }
  }

  onPostComment() {
    console.log('send clicked');
    this.media.postNewComment(this.post.file_id, this.inputVal);
  }

  chekcValidityAndResize() {
    this.commentValid = this.inputVal.length > 0;
    const input = this.commentModalInput.nativeElement;
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
  }

  presentCommentModal() {
    this.showCommentModal = true;
    setTimeout(() => {
      this.commentModal.nativeElement.classList.add('modal-visible');
      this.commentModalInput.nativeElement.focus();
    }, 0);
  }

  dismissCommentModal() {
    console.log('Dismiss comment modal');
    this.commentModal.nativeElement.classList.remove('modal-visible');
    setTimeout(() => {
      this.showCommentModal = false;
    }, 200);
  }

  async presentToast(msg: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async openMap() {
    this.showMap = !this.showMap;
  }

  hasCoordinates() {
    try {
      const postContent = <Description>JSON.parse(this.post.description);
      this.showCoordinates = postContent.hasOwnProperty('coordinates');
    } catch (e) {}
  }

  ngOnDestroy() {
    console.log('unsubscribing from ' + EVENT_SINGLE_MEDIA_UPDATE);
    this.event.unsubscribe(EVENT_SINGLE_MEDIA_UPDATE);
  }
}
