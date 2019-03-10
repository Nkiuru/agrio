import { NgModule } from '@angular/core';
import { UserPostsComponent } from './user-posts.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MediaItemCardModule } from '../media-item-card/media-item-card.module';
import { UserComponent } from '../user/user.component';


@NgModule({
  declarations: [UserPostsComponent, UserComponent],
  imports: [CommonModule, IonicModule, FormsModule, MediaItemCardModule],
  exports: [UserPostsComponent]
})
export class UserPostsModule {
}
