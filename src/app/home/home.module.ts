import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { MediaItemCardComponent } from '../components/media-item-card/media-item-card.component';
import { PipesModule } from '../pipes/pipes.module';
import { MediaItemCardModule } from '../components/media-item-card/media-item-card.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    MediaItemCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    ToolbarModule,
  ],
  declarations: [HomePage, WelcomeComponent]
})
export class HomePageModule {}
