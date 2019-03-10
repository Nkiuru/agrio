import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    let userId;
    let local: User;
    this.route.paramMap.subscribe(id => {
      userId = id.get('id');
      try {
        local = <User>JSON.parse(localStorage.getItem('user'));
      } catch (e) {
        console.log(e);
      }
      if (userId && userId === local.user_id) {
        this.user = local;
      } else if (userId) {
        this.userService.getUser(userId).subscribe((data) => {
          this.user = data;
        });
      } else {
        this.user = local;
      }
    });
  }

}
