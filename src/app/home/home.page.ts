import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Platform, ToastController, Events } from '@ionic/angular';
import { MediaService } from '../media.service';
import { Post } from '../interfaces/post';
import { EVENT_MEDIA_ARRAY_UPDATE } from '../app-constants';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  search = '';
  welcomeDismissed: boolean =
    localStorage.getItem('welcomeDismissed') === 'true';

  postArray: Post[];
  profilePicArray: Post[];

  showSpinner = false;

  @ViewChild('loadTrigger') loadTrigger: ElementRef;

  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private media: MediaService,
    private event: Events
  ) {
    event.subscribe(EVENT_MEDIA_ARRAY_UPDATE, array => {
      this.postArray = array;
    });
  }

  ngOnInit() {
    this.media.initData();

    const lazyLoadPosts = target => {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if ( entry.isIntersecting ) {
            console.log('showing spinner');
            this.showSpinner = true;
            this.media.nextPostsSegment();
          } else {
            console.log('hiding spinner');
            this.showSpinner = false;
          }
        });
      });
      io.observe(target);
    };

    lazyLoadPosts(this.loadTrigger.nativeElement);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    this.media.initData();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  onWelcomeDismissed(dismissed: boolean) {
    this.welcomeDismissed = dismissed;
    localStorage.setItem('welcomeDismissed', String(dismissed));
  }

  ngOnDestroy() {
    this.event.unsubscribe(EVENT_MEDIA_ARRAY_UPDATE);
  }

}
