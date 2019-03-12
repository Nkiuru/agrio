import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { MediaItemCardModule } from '../components/media-item-card/media-item-card.module';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ToolbarModule,
    MediaItemCardModule,
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
