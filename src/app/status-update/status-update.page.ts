import { Component, OnInit } from '@angular/core';
import { Description } from '../interfaces/description';
import { UploadService } from '../upload.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { PLACEHOLDER } from '../app-constants';
import { Router } from '@angular/router';

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

  constructor(private upload: UploadService, private loadingCtrl: LoadingController, private toast: ToastController, private router: Router) {
  }

  ngOnInit() {
    this.description = <Description>{
      postType: 'statusUpdate',
      content: {
        realDescription: '',
      }
    };
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
    }
    form.append('title', this.title);
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
