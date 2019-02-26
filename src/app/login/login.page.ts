import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username = '';
  password = '';

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.username.length > 0 && this.password.length > 0) {
      this.loginService.logIn(this.username, this.password).subscribe((data) => {
        console.log(data);
        if (data.ok) {
          localStorage.setItem('token', data.token);
          this.loginService.loggedIn = true;
        }
      }, error => console.log(error));
    }
  }

}
