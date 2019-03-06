import { Component, OnInit } from '@angular/core';
import {
  ToastController,
  Platform,
  LoadingController
} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation, Environment, BaseArrayClass, LatLng, MarkerOptions
} from '@ionic-native/google-maps';
import { StoresService } from '../stores.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  search: string;
  map: GoogleMap;
  loading: any;
  environment: Environment = null;

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform,
    private Stores: StoresService) {
    this.environment = new Environment();
    this.environment.setBackgroundColor('#005944');
  }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    await this.platform.ready();
    this.Stores.getStores().subscribe(data => {
      this.loadMap(data);
    }, error1 => console.log(error1));
  }

  loadMap(stores) {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 60.2,
          lng: 24.93
        },
        zoom: 10,
        tilt: 0
      }
    });
    stores.forEach(store => {
      const coordinates: LatLng = new LatLng(store.position.lat, store.position.lgn);

      const markerOptions: MarkerOptions = {
        position: coordinates,
        title: store.title,
        snippet: store.description,
      };

      this.map.addMarker(markerOptions)
        .then((marker: Marker) => {
          marker.showInfoWindow();
        });

    });
  }

  async onButtonClick() {
    this.map.clear();

    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loading.present();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      this.loading.dismiss();
      console.log(JSON.stringify(location, null, 2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      });

      // add a marker
      const marker: Marker = this.map.addMarkerSync({
        title: 'Your location',
        snippet: 'You are here',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });

      // show the infoWindow
      marker.showInfoWindow();

      // If clicked it, display the alert
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.showToast('clicked!');
      });
    })
      .catch(err => {
        this.loading.dismiss();
        this.showToast(err.error_message);
      });
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }
}
