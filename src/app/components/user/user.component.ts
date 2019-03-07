import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../interfaces/user';
import { LoadingController } from '@ionic/angular';
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

  constructor(private userService: UserService, public loadingCtrl: LoadingController, private router:Router) {
  }

  async ngOnInit() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loading.present();
    let local;
    try {
      local = <User>JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      console.log(e);
    }
    if (local && local.user_id === this.userId) {
      this.user = local;
      this.loading.dismiss().catch(err => console.log(err));
    } else {
      this.userService.getUser(this.userId).subscribe((data) => {
        this.user = data;
        this.loading.dismiss().catch(err => console.log(err));
      });
    }
  }

  openSettings() {
    this.router.navigate(['/tabs/profile/settings']).catch(err => console.log(err));
  }

  openLikedPosts() {
    // open user's liked posts
  }

  openAddPost() {
    // open add post page
  }

}
