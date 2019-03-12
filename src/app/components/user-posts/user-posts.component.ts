import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post';
import { MediaService } from '../../media.service';
import { Events } from '@ionic/angular';
import {
  EVENT_MEDIA_ARRAY_UPDATE,
  EVENT_PROFILE_PIC_ARRAY_UPDATE,
  EVENT_USER_MEDIA_ARRAY_UPDATE
} from '../../app-constants';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit, OnDestroy {
  @Input() user: User;
  postArray: Post[];

  constructor(private media: MediaService, private event: Events, private router: Router) {
    event.subscribe(EVENT_USER_MEDIA_ARRAY_UPDATE, array => {
      this.postArray = array;
    });
  }

  ngOnInit() {
    const userPage = this.router.isActive('user', false);
    if (userPage) {
      this.media.initProfileData(this.user.user_id);
    }
  }

  ngOnDestroy() {
    this.event.unsubscribe(EVENT_MEDIA_ARRAY_UPDATE);
  }
}
