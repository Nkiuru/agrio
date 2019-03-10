import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { StatusBarService } from '../status-bar.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  username = '';
  password = '';
  @ViewChild('uname') usernameElm: ElementRef;
  @ViewChild('passwd') passwordElm: ElementRef;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private statusBar: StatusBarService,
    private toast: ToastController,
    private nav: NavController,
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.statusBar.setToLight();
  }

  submit() {
    if (this.username.length > 0 && this.password.length > 0) {
      this.loginService.logIn(this.username, this.password).subscribe(
        data => {
          console.log(data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.loginService.isLoggedIn = true;
          this.nav.navigateRoot('/tabs/home').catch(err => console.log(err));
        },
        error => {
          const message: string = error.error.message;
          this.showToast(message);
          if (message.includes('username')) {
            // @ts-ignore
            this.usernameElm.el.classList.add('ion-invalid');
          }
          if (message.includes('password')) {
            // @ts-ignore
            this.passwordElm.el.classList.add('ion-invalid');
          }
        }
      );
    }
  }

  signUp() {
    this.router.navigate(['/sign-up']).catch(err => console.log(err));
  }

  async showToast(message: string) {
    let toast = await this.toast.create({
      message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
