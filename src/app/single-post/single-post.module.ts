import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SinglePostPage } from './single-post.page';
import { PipesModule } from '../pipes/pipes.module';
import { CommentComponent } from './comment/comment.component';

const routes: Routes = [
  {
    path: '',
    component: SinglePostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SinglePostPage, CommentComponent]
})
export class SinglePostPageModule {}
