import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { UserService } from '../user.service';
import { LoginService } from '../login.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  @ViewChild(IonSlides) slider: IonSlides;
  text = 'You will be identified by your first and last name in the app.';
  infoType = 'info';
  fName = '';
  lName = '';
  email = '';
  password = '';
  passwordConfirm = '';
  username = '';
  validPassword = false;

  constructor(private user: UserService, private loginService: LoginService, private nav: NavController) {
  }

  ngOnInit() {
  }

  updateCard() {
    this.slider.getActiveIndex().then(slideIndex => {
      if (slideIndex === 0) {
        this.text = 'You will be identified by your first and last name in the app.';
      } else if (slideIndex === 1) {
        this.text = 'Pick a unique username for yourself.';
      }
    });
  }

  register() {
    this.user.register(this.username, this.password, this.email, `${this.fName} ${this.lName}`).subscribe(data => {
      console.log(data);
      this.login();
    }, error => {
      console.log(error);
    });
  }

  next() {
    this.slider.slideNext().catch(err => console.log(err));
  }

  checkPasswords() {
    this.validPassword = this.password === this.passwordConfirm;
    return this.validPassword;
  }

  checkUsername(username: string) {
    if (username.length < 3) {
      return;
    }
    this.user.checkUsername(username).subscribe(data => {
      console.log(data);
    });
  }

  login() {
    this.loginService.logIn(this.username, this.password).subscribe((data) => {
      console.log(data);
      localStorage.setItem('token', data.token);
      this.loginService.isLoggedIn = true;
      this.nav.navigateRoot('/tabs/home').catch(err => console.log(err));
    }, error => console.log(error));
  }

  showConfirmTip(){
    this.text = 'Confirm your password to make sure it is what you intended.';
  }

  showEmailTip(){
    this.text = 'We will use your email address to send you a confirmation link to verify your account.It will also be used to contact you if necessary.';
  }

  showPasswordTip(){
    this.text = 'Password should be at least 6 (six) characters long and contain letters and numbers.';
  }

}
