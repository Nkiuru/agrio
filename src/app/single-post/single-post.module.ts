import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SinglePostPage } from './single-post.page';
import { PipesModule } from '../pipes/pipes.module';
import { CommentComponent } from './comment/comment.component';
import { PostLocationModule } from '../components/post-location/post-location.module';
import { PopoverComponent } from './popover/popover.component';

const routes: Routes = [
  {
    path: '',
    component: SinglePostPage
  }
];

@NgModule({
  entryComponents: [PopoverComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes),
    PostLocationModule,
  ],
  declarations: [SinglePostPage, CommentComponent, PopoverComponent]
})
export class SinglePostPageModule {}
