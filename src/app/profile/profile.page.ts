import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;

  constructor() {
  }

  ngOnInit() {
    try {
      this.user = JSON.parse(localStorage.getItem('user'));
      console.log(this.user);
    } catch (e) {
      console.log(e);
    }
  }

}
