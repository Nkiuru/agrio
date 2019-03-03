import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private statusBar: StatusBar) {}

  ionViewWillEnter() {
    // switch status bar color to white icons and green background
    this.statusBar.styleLightContent();
    this.statusBar.backgroundColorByHexString('#005944');
  }

}
