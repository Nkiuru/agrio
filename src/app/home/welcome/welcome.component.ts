import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @Output() dismissedWelcome = new EventEmitter<boolean>();
  dismissed = false;

  constructor() {}

  ngOnInit() {}

  onTransitionEnd(event: Event) {
    if (event['propertyName'] === 'margin-bottom') {
      console.log('EMIT: dismissedWelcome()');
      this.dismissedWelcome.emit(true);
    }
  }
}
