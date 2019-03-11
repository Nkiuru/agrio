import { NgModule } from '@angular/core';
import { PostLocationComponent } from './post-location.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostLocationComponent],
  entryComponents: [PostLocationComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [PostLocationComponent]
})
export class PostLocationModule { }
