import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LikedPostsPage } from './liked-posts.page';
import { MediaItemCardModule } from '../components/media-item-card/media-item-card.module';

const routes: Routes = [
  {
    path: '',
    component: LikedPostsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MediaItemCardModule,
  ],
  declarations: [LikedPostsPage]
})
export class LikedPostsPageModule {}
