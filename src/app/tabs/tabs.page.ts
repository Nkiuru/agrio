import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StatusBarService } from '../status-bar.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private statusBar: StatusBarService) {}

  ionViewWillEnter() {
    this.statusBar.setToDark();
  }

}
