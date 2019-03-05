import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
