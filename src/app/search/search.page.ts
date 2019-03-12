import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '../media.service';
import { EVENT_LIKED_ARRAY_UPDATE, EVENT_TAG_ARRAY_UPDATE } from '../app-constants';
import { Events } from '@ionic/angular';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  searchTerm = '';
  tag: string;
  postArray: Post[];
  focusOnSearch = false;

  constructor(private route: ActivatedRoute, private media: MediaService, private event: Events) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.tag = params.tag;
      if (this.tag) {
        this.media.initTagPosts(this.tag);
        this.event.subscribe(EVENT_TAG_ARRAY_UPDATE, array => {
          this.postArray = array;
        });
      } else {
        this.focusOnSearch = true;
      }
    });
  }

  ngOnDestroy() {
    this.event.unsubscribe(EVENT_TAG_ARRAY_UPDATE);
  }

}
