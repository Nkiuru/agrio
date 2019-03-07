import { NgModule } from '@angular/core';
import { ImageSizePipe } from './image-size.pipe';

@NgModule({
    declarations: [
      ImageSizePipe
    ],
    imports: [],
    exports: [
        ImageSizePipe
    ]
})
export class PipesModule {}
