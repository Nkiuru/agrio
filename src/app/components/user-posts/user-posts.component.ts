import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post';
import { MediaService } from '../../media.service';
import { Events } from '@ionic/angular';
import { EVENT_MEDIA_ARRAY_UPDATE, EVENT_PROFILE_PIC_ARRAY_UPDATE, EVENT_USER_MEDIA_ARRAY_UPDATE } from '../../app-constants';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit, OnDestroy {
  @Input() userId: number;
  postArray: Post[];
  profilePicArray: Post[];

  constructor(private media: MediaService,
              private event: Events) {
    event.subscribe(EVENT_USER_MEDIA_ARRAY_UPDATE, array => {
      this.postArray = array.reverse();
    });
    event.subscribe(EVENT_PROFILE_PIC_ARRAY_UPDATE, array => {
      this.profilePicArray = array;
    });
  }

  ngOnInit() {
    this.media.initProfileData(this.userId);
  }

  ngOnDestroy() {
    this.event.unsubscribe(EVENT_MEDIA_ARRAY_UPDATE);
    this.event.unsubscribe(EVENT_PROFILE_PIC_ARRAY_UPDATE);
  }

}
