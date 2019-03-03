import { Injectable } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {

  private isLight = true;

  constructor(private statusBar: StatusBar) { }

  setToLight() {
    if (!this.isLight) {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#fff');
      this.isLight = true;
    }
  }

  setToDark() {
    if (this.isLight) {
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#005944');
      this.isLight = false;
    }
  }
}
