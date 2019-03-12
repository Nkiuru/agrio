import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {

  constructor(private popover: PopoverController) { }

  async onDismiss() {
    try {
        await this.popover.dismiss('delete');
    } catch (e) {
        //click more than one time popover throws error, so ignore...
    }

}

}
