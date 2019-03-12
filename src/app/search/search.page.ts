import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '../media.service';
import { EVENT_LIKED_ARRAY_UPDATE, EVENT_MEDIA_ARRAY_UPDATE, EVENT_TAG_ARRAY_UPDATE } from '../app-constants';
import { Events } from '@ionic/angular';
import { Post } from '../interfaces/post';
import { Description } from '../interfaces/description';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  searchTerm = '';
  tag: string;
  hasTag: boolean;
  postArray: Post[] = [];
  focusOnSearch = false;
  allPosts: Post[];

  constructor(private route: ActivatedRoute, private media: MediaService, private event: Events) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.tag = params.tag;
      if (this.tag) {
        this.hasTag = true;
        this.media.initTagPosts(this.tag);
        this.event.subscribe(EVENT_TAG_ARRAY_UPDATE, array => {
          this.postArray = array;
          this.allPosts = Object.assign([], array);
        });
      } else {
        this.hasTag = false;
        this.media.initData();
        this.event.subscribe(EVENT_MEDIA_ARRAY_UPDATE, array => {
          this.allPosts = array;
        });
        this.focusOnSearch = true;
      }
    });
  }

  filterPosts() {
    this.postArray.length = 0;
    console.log(this.allPosts);
    this.allPosts.forEach((post) => {
      try {
        const description = <Description>JSON.parse(post.description);
        if (post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
          || description.content.realDescription.toLowerCase().includes(this.searchTerm.toLowerCase())) {
          this.postArray.push(post);
        }
      } catch (e) {

      }
    });
  }

  ngOnDestroy() {
    this.event.unsubscribe(EVENT_TAG_ARRAY_UPDATE);
    this.event.unsubscribe(EVENT_MEDIA_ARRAY_UPDATE);
  }

}
