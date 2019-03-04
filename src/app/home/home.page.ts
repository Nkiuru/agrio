import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  subscription: any;
  search: string = '';
  welcomeDismissed: boolean = (localStorage.getItem('welcomeDismissed') === 'true');

  constructor(private platform: Platform, private toastCtrl: ToastController) {
  }

  ionViewDidEnter() {
    let lastTimeBackPress = 0;
    let timePeriodToExit = 2000;
    this.subscription = this.platform.backButton.subscribe(() => {
      if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
        navigator['app'].exitApp();
      } else {
        this.showToast().catch(err => console.log(err));
        lastTimeBackPress = new Date().getTime();
      }
    });
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
