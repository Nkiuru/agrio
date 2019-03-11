import { Component, OnInit } from '@angular/core';
import { Description } from '../interfaces/description';
import { UploadService } from '../upload.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { PLACEHOLDER } from '../app-constants';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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

  constructor(private upload: UploadService, private loadingCtrl: LoadingController, private toast: ToastController, private router: Router, private geolocation: Geolocation) {
  }

  ngOnInit() {
    this.description = <Description>{
      postType: 'pictureUpdate',
      content: {
        realDescription: '',
      }
    };
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
      this.description.postType = 'statusUpdate';
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
        this.loading.dismiss().catch((err) => console.log(err));
        this.showToast('Status update added!').then(() => {
          this.router.navigate(['tabs/home']);
        }).catch(err => console.log(err));
      });
    }, error => {
      this.loading.dismiss();
      console.log(error);
    });
  }

  isValid() {
    return this.title.length > 0 && this.description.content.realDescription.length > 0;
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
