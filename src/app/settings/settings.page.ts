import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../interfaces/user';
import { ToastController, LoadingController, Events } from '@ionic/angular';
import { UploadService } from '../upload.service';
import { MediaService } from '../media.service';
import { API_UPLOADS, EVENT_PROFILE_PIC_ARRAY_UPDATE } from '../app-constants';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user: User;
  available = true;
  username;
  file: File;
  loading: any;
  profilePic;

  constructor(
    private router: Router,
    private event: Events,
    private userService: UserService,
    private toast: ToastController,
    private loadingCtrl: LoadingController,
    private upload: UploadService,
    private media: MediaService) {
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
    const pic = this.media.getProfilePic(this.user.user_id);
    if (pic) {
      this.profilePic = API_UPLOADS + pic;
    } else {
      this.profilePic = '../../../assets/img/default_profile_pic.jpg';
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

  async submit() {
    const form = new FormData();
    form.append('file', this.file);
    form.append('title', 'profile_picture');
    this.loading = await this.loadingCtrl.create({
      message: 'Uploading'
    });
    await this.loading.present();
    const profileId = this.media.getProfilePicId(this.user.user_id);
    if (profileId) {
      this.upload.deleteProfilePic(profileId).subscribe((data) => {
        this.uploadPicture(form);
      });
    } else {
      this.uploadPicture(form);
    }
  }

  uploadPicture(form) {
    this.upload.uploadFile(form).subscribe(data => {
      const id = data.file_id;
      this.upload.addTag(id, 'profile').subscribe((tag) => {
        this.loading.dismiss().catch((err) => console.log(err));
        this.showToast('Picture updated').catch(err => console.log(err));
      });
    }, error => console.log(error));
  }

  fileUpload(event: Event) {
    const reader = new FileReader();
    const preview = document.getElementById('preview');
    reader.onloadend = () => {
      // @ts-ignore
      preview.src = reader.result;
      // @ts-ignore
      this.file.src = reader.result;
    };
    // @ts-ignore
    this.file = event.target.files[0];
    reader.readAsDataURL(this.file);
    this.submit().catch(err => console.log(err));
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
