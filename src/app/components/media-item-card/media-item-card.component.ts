import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-media-item-card',
  templateUrl: './media-item-card.component.html',
  styleUrls: ['./media-item-card.component.scss']
})
export class MediaItemCardComponent implements OnInit {

  @Input() postData: any;

  postLiked = false;

  constructor() { }

  ngOnInit() {}

  onLike() {
    console.log('like clicked');
    this.postLiked = !this.postLiked;
  }

}
