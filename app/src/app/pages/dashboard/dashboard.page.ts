import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.page.scss'],
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="/">
          <ion-icon name="calendar"></ion-icon>
          <ion-label>Dashboard</ion-label>
          <ion-badge>6</ion-badge>
        </ion-tab-button>

        <ion-tab-button tab="features">
          <ion-icon name="person-circle"></ion-icon>
          <ion-label>Features</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings">
          <ion-icon name="map"></ion-icon>
          <ion-label>Extras</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>`,
})
export class DashboardPage implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
