import { NgModule } from '@angular/core';
import { ImageSizePipe } from './image-size.pipe';
import { MomentPipe } from './moment.pipe';

@NgModule({
    declarations: [
      ImageSizePipe,
      MomentPipe
    ],
    imports: [],
    exports: [
        ImageSizePipe,
        MomentPipe
    ]
})
export class PipesModule {}
