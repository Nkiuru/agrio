import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() userId;
  user: User;
  loading: any;
  isCurrentUser = false;

  constructor(private userService: UserService, private router: Router) {
  }

  async ngOnInit() {
    let local;
    try {
      local = <User>JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      console.log(e);
    }
    if (local && local.user_id === this.userId) {
      this.user = local;
      this.isCurrentUser = true;
    } else {
      this.userService.getUser(this.userId).subscribe((data) => {
        this.user = data;
      });
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
