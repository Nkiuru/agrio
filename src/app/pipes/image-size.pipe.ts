import { Pipe, PipeTransform } from '@angular/core';
import { TN_160, SMALL, API_UPLOADS, MEDIUM, TN_320, LARGE, TN_640, ORIGINAL } from '../app-constants';

@Pipe({
  name: 'imageSize'
})
export class ImageSizePipe implements PipeTransform {

  transform(filename: string, size: string): string {

    const thumbnail = filename.split('.')[0];

    switch (size) {

      case SMALL: {
        return API_UPLOADS + thumbnail + TN_160;
      }

      case MEDIUM: {
        return API_UPLOADS + thumbnail + TN_320;
      }

      case LARGE: {
        return API_UPLOADS + thumbnail + TN_640;
      }

      case ORIGINAL: {
        return API_UPLOADS + filename;
      }

      default: {
        return API_UPLOADS + filename;
      }

    }
  }

}
