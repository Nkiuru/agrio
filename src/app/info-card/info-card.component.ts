import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {
  @Input() infoText: string;
  @Input() type: string;
  iconName = 'information-circle-outline';

  constructor() {
    if (this.type === 'error') {
      this.iconName = 'warning';
    }
  }

  ngOnInit() {
  }

}
