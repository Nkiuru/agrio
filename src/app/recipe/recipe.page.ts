import { Component, OnInit } from '@angular/core';
import { Description } from '../interfaces/description';
import { UploadService } from '../upload.service';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RECIPE_POST } from '../app-constants';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  description: Description;
  loading: any;
  file: File;
  title = '';
  fileUploaded;
  tags = [];
  tag = '';

  constructor(
    private upload: UploadService,
    private loadingCtrl: LoadingController,
    private toast: ToastController,
    private router: Router,
    private nav: NavController) {
  }

  ngOnInit() {
    this.description = <Description>{
      postType: RECIPE_POST,
      content: {
        ingredients: [{ amount: 0, ingredient: '', unit: '' }],
        steps: [{text: ''}],
        realDescription: '',
      }
    };
  }

  addTag() {
    this.tags.push(this.tag);
    this.tag = '';
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
    form.append('file', this.file);
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
        const promises = [];
        this.tags.forEach(tg => {
          promises.push(this.upload.addTag(id, tg).toPromise());
        });
        Promise.all(promises).then(() => {
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

  addIngredient() {
    this.description.content.ingredients.push({ amount: 0, ingredient: '', unit: '' });
  }

  removeIngredient(index) {
    this.description.content.ingredients.splice(index, 1);
  }

  addStep() {
    this.description.content.steps.push({ text: '' });
  }

  removeStep(index) {
    this.description.content.steps.splice(index, 1);
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

  isValid() {
    return this.fileUploaded && this.title.length > 2;
  }

}
