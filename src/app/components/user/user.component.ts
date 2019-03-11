import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreatePostPage } from '../../create-post/create-post.page';
import { API_UPLOADS } from '../../app-constants';
import { MediaService } from '../../media.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  isCurrentUser = false;
  profilePic;

  constructor(private router: Router, private modal: ModalController, private media: MediaService) {
  }

  async ngOnInit() {
    let local;
    try {
      local = <User>JSON.parse(localStorage.getItem('user'));
      const pic = this.media.getProfilePic(this.user.user_id);
      if (pic) {
        this.profilePic = API_UPLOADS + this.media.getProfilePic(this.user.user_id);
      } else {
        this.profilePic = '../../../assets/img/default_profile_pic.jpg';
      }
    } catch (e) {
      console.log(e);
    }
    if (local && local.user_id === this.user.user_id) {
      this.isCurrentUser = true;
    }
  }

  openSettings() {
    this.router.navigate(['/settings']).catch(err => console.log(err));
  }

  openLikedPosts() {
    this.router.navigate(['/liked-posts']).catch(err => console.log(err));
  }

  async openAddPost() {
    const modal = await this.modal.create({
      component: CreatePostPage,
      showBackdrop: true,
      cssClass: 'post-modal'
    });
    return await modal.present();
  }

}
