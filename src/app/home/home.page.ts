import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, ToastController, Events } from '@ionic/angular';
import { MediaService } from '../media.service';
import { Post } from '../interfaces/post';
import { EVENT_MEDIA_ARRAY_UPDATE, EVENT_MEDIA_SERVICE_INIT, EVENT_PROFILE_PIC_ARRAY_UPDATE } from '../app-constants';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  subscription: any;
  search = '';
  welcomeDismissed: boolean =
    localStorage.getItem('welcomeDismissed') === 'true';

  postArray: Post[];
  profilePicArray: Post[];

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
  }

  ionViewDidEnter() {
    let lastTimeBackPress = 0;
    const timePeriodToExit = 2000;
    this.subscription = this.platform.backButton.subscribeWithPriority(
      9999,
      () => {
        if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
          navigator['app'].exitApp();
        } else {
          this.showToast().catch(err => console.log(err));
          lastTimeBackPress = new Date().getTime();
        }
      }
    );
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'Press back again to exit App',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  onWelcomeDismissed(dismissed: boolean) {
    this.welcomeDismissed = dismissed;
    localStorage.setItem('welcomeDismissed', String(dismissed));
  }

  ngOnDestroy() {
    this.event.unsubscribe(EVENT_MEDIA_ARRAY_UPDATE);
  }

}
