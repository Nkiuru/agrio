import { Component, OnInit } from '@angular/core';
import { Description } from '../interfaces/description';
import { UploadService } from '../upload.service';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { PICTURE_POST, PLACEHOLDER, STATUS_POST } from '../app-constants';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-status-update',
  templateUrl: './status-update.page.html',
  styleUrls: ['./status-update.page.scss'],
})
export class StatusUpdatePage implements OnInit {
  description: Description;
  title = '';
  file: any;
  loading: any;
  fileUploaded = false;
  enableCoordinates = false;
  tags = [];
  serverTags = [];
  tag = '';

  constructor(
    private upload: UploadService,
    private loadingCtrl: LoadingController,
    private toast: ToastController,
    private router: Router,
    private geolocation: Geolocation,
    private nav: NavController,
    private media: MediaService) {
  }

  ngOnInit() {
    this.description = <Description>{
      postType: PICTURE_POST,
      content: {
        realDescription: '',
      }
    };
    this.upload.getTags().subscribe(data => {
      this.serverTags = data;
    });
  }

  addTag() {
    this.tags.push(this.tag);
    this.tag = '';
  }

  askLocation() {
    if (this.enableCoordinates) {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.description.coordinates = {
          lat: resp.coords.latitude,
          long: resp.coords.longitude
        };
      }).catch((error) => {
        this.showToast(error);
      });
    }
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
    this.fileUploaded = true;
  }

  async submit() {
    const form = new FormData();
    if (this.file) {
      form.append('file', this.file);
    } else {
      // tslint:disable-next-line
      this.file = new Blob([PLACEHOLDER], { type: 'image/jpg' });
      form.append('file', this.file);
      this.description.postType = STATUS_POST;
    }
    form.append('title', this.title);
    if (!this.enableCoordinates) {
      delete this.description.coordinates;
    }
    form.append('description', JSON.stringify(this.description));
    this.loading = await this.loadingCtrl.create({
      message: 'Uploading'
    });
    await this.loading.present();
    if (this.isValid()) {
      this.uploadRecipe(form);
    }
  }

  uploadRecipe(form) {
    this.upload.uploadFile(form).subscribe(data => {
      const id = data.file_id;
      this.upload.addTag(id, 'agrio').subscribe((tag) => {
        const promises = [];
        this.tags.forEach(tg => {
          promises.push(this.upload.addTag(id, tg).toPromise());
        });
        Promise.all(promises).then(() => {
          this.media.initData();
          this.loading.dismiss().catch((err) => console.log(err));
          this.showToast('Status update added!').then(() => {
            this.nav.pop();
            this.router.navigate(['tabs/home']);
          }).catch(err => console.log(err));
        });
      });
    }, error => {
      this.loading.dismiss();
      console.log(error);
    });
  }

  isValid() {
    return this.title.length > 0;
  }

  goBack() {
    this.router.navigate(['tabs/profile']).catch();
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
