import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Environment, GoogleMap, GoogleMaps, LatLng, Marker } from '@ionic-native/google-maps';
import { Post } from '../../interfaces/post';
import { Description } from '../../interfaces/description';

@Component({
  selector: 'app-post-location',
  templateUrl: './post-location.component.html',
  styleUrls: ['./post-location.component.scss']
})
export class PostLocationComponent implements OnInit {
  @Input() post: Post;
  map: GoogleMap;

  constructor(private platform: Platform) {
    if (this.platform.is('hybrid')) {
      Environment.setBackgroundColor('#005944');
    }
  }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    try {
      const postContent = <Description>JSON.parse(this.post.description);
      this.map = GoogleMaps.create('map_canvas', {});
      const coordinates: LatLng = new LatLng(postContent.coordinates.lat, postContent.coordinates.long);
      const marker: Marker = this.map.addMarkerSync({
        position: coordinates,
        title: this.post.title,
        snippet: postContent.content.realDescription,
      });
      this.map.animateCamera({
        target: marker.getPosition(),
        zoom: 17,
        tilt: 30
      });
      marker.showInfoWindow();
    } catch (e) {
      console.log(e);
    }

  }
}
