import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  isCurrentUser = false;

  constructor(private router: Router) {
  }

  async ngOnInit() {
    let local;
    try {
      local = <User>JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      console.log(e);
    }
    if (local && local.user_id === this.user.user_id) {
      this.isCurrentUser = true;
    }
  }

  openSettings() {
    this.router.navigate(['/settings']).catch(err => console.log(err));
  }

  openLikedPosts() {
    // open user's liked posts
  }

  openAddPost() {
    // open add post page
  }

}
