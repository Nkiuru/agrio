import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StatusBarService } from '../status-bar.service';
import { MediaService } from '../media.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private statusBar: StatusBarService, private media: MediaService) {
  }

  ionViewWillEnter() {
    this.statusBar.setToDark();
  }

  loadProfileData() {
    const user = <User>JSON.parse(localStorage.getItem('user'));
    this.media.initProfileData(user.user_id);
  }

}
