import { NgModule } from '@angular/core';
import { MediaItemCardComponent } from './media-item-card.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [MediaItemCardComponent],
  imports: [CommonModule, IonicModule, FormsModule, PipesModule, RouterModule],
  exports: [MediaItemCardComponent]
})
export class MediaItemCardModule {}
