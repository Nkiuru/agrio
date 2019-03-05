import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { MediaService } from '../media.service';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  subscription: any;
  search = '';
  welcomeDismissed: boolean =
    localStorage.getItem('welcomeDismissed') === 'true';

  postArray: Post[];

  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private media: MediaService
  ) {}

  ngOnInit() {
    this.media.getMediaInSegments().subscribe(
      res => {
        console.log(res);
        this.postArray = res;
      },
      err => {
        console.log(err.message);
        console.log(err);
      }
    );
  }

  ionViewDidEnter() {
    let lastTimeBackPress = 0;
    let timePeriodToExit = 2000;
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
    let toast = await this.toastCtrl.create({
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
}
