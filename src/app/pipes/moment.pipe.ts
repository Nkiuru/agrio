import { Pipe, PipeTransform } from '@angular/core';
import { MS_SEC, MS_MIN, MS_HR, MS_DAY, MS_WEEK, MS_MONTH } from '../app-constants';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: Date): string {

    const timestamp = new Date(value).getTime();
    const now = new Date().getTime();
    const difference = now - timestamp;

    if ( difference <= 1000 ) {
      return '1s ago';
    }

    const months = Math.floor(difference / MS_MONTH);
    if ( months > 0 ) {
      return `${months}m ago`;
    }

    const weeks = Math.floor(difference / MS_WEEK);
    if ( weeks > 0 ) {
      return `${weeks}w ago`;
    }

    const days = Math.floor(difference / MS_DAY);
    if ( days > 0 ) {
      return `${days}d ago`;
    }

    const hours = Math.floor(difference / MS_HR);
    if ( hours > 0 ) {
      return `${hours}h ago`;
    }

    const minutes = Math.floor(difference / MS_MIN);
    if ( minutes > 0 ) {
      return `${minutes}m ago`;
    }

    const seconds = Math.floor(difference / MS_SEC);
    if ( seconds > 0 ) {
      return `${seconds}s ago`;
    }

    return 'error :(';
  }

}
