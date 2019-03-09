import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { UserComponent } from '../components/user/user.component';
import { UserPostsModule } from '../components/user-posts/user-posts.module';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ToolbarModule,
    UserPostsModule,
  ],
  declarations: [ProfilePage, UserComponent]
})
export class ProfilePageModule {}
