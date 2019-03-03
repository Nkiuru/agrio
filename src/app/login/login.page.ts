import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { StatusBarService } from '../status-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  username = '';
  password = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private statusBar: StatusBarService
  ) {}

  ngOnInit() {}

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
          this.router.navigate(['']).catch(err => console.log(err));
        },
        error => console.log(error)
      );
    }
  }

  signUp() {
    this.router.navigate(['/sign-up']).catch(err => console.log(err));
  }
}
