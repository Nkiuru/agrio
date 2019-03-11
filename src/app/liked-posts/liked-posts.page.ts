import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaService } from '../media.service';
import { EVENT_LIKED_ARRAY_UPDATE} from '../app-constants';
import { Events } from '@ionic/angular';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-liked-posts',
  templateUrl: './liked-posts.page.html',
  styleUrls: ['./liked-posts.page.scss'],
})
export class LikedPostsPage implements OnInit, OnDestroy {
  postArray: Post[];

  constructor(private router: Router, private media: MediaService, private event: Events) {
  }

  ngOnInit() {
    this.event.subscribe(EVENT_LIKED_ARRAY_UPDATE, array => {
      this.postArray = array;
    });
    this.media.initLikedData();
  }

  goBack() {
    this.router.navigate(['tabs/profile']).catch(err => console.log(err));
  }

  ngOnDestroy() {
    this.event.unsubscribe(EVENT_LIKED_ARRAY_UPDATE);
  }

}
