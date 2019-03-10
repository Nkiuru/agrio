import { NgModule } from '@angular/core';
import { MediaItemCardComponent } from './media-item-card.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [MediaItemCardComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [MediaItemCardComponent]
})
export class MediaItemCardModule { }
