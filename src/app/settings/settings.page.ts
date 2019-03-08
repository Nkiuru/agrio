import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../interfaces/user';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user: User;
  available = true;
  username;

  constructor(private router: Router, private userService: UserService, private toast: ToastController) {
  }

  ngOnInit() {
    try {
      this.user = <User>JSON.parse(localStorage.getItem('user'));
      this.username = this.user.username;
    } catch (e) {
      console.log(e);
    }
    if (!this.user) {
      this.userService.getUserData().subscribe((data) => {
        this.user = data;
        localStorage.setItem('user', JSON.stringify(this.user));
      });
    }
  }

  goBack() {
    this.router.navigate(['/tabs/profile']).catch(err => console.log(err));
  }

  save() {
    this.userService.updateUser(this.user).subscribe((data) => {
      this.showToast(data.message).catch(err => console.log(err));
      if (data.ok) {
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    }, error1 => console.log(error1));
  }

  uploadPhoto() {

  }

  checkUsername(username: string) {
    if (this.username === username) {
      return;
    }
    if (username.length < 3) {
      return;
    }
    this.userService.checkUsername(username).subscribe(data => {
      console.log(data);
      this.available = data.available;
    });
  }

  async showToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
