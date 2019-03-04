import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-item-card',
  templateUrl: './media-item-card.component.html',
  styleUrls: ['./media-item-card.component.scss']
})
export class MediaItemCardComponent implements OnInit {

  postLiked: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onLike() {
    console.log('like clicked');
    this.postLiked = !this.postLiked;
  }

}
