import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {

  constructor(private modal: ModalController, private router: Router) {
  }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }

  openStatus() {
    this.router.navigate(['upload/status']);
    this.close();
  }

  openRecipe() {
    this.router.navigate(['upload/recipe']);
    this.close();
  }

}
