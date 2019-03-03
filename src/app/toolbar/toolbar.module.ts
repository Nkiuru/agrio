import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, IonicModule],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
