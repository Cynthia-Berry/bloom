import {Injectable} from '@angular/core';
import {LoadingController, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private loader: HTMLIonLoadingElement;
  private toast: HTMLIonToastElement;


  constructor(private loaderController: LoadingController, private toastController: ToastController) {
  }

  async showLoader(message: string = 'Loading...') {
    this.loader = await this.loaderController.create({
      message,
      translucent: true,
      cssClass: 'custom-loading',
      backdropDismiss: false,
      animated: true,
    });
    await this.loader.present();
  }

  async closeLoader() {
    await this.loader.dismiss();
  }

  async showToast(message, color?) {
    this.toast = await this.toastController.create({
      message,
      color,
      position: "bottom",
      duration: 10000,
      mode: "ios",
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
        }
      ]
    });
    await this.toast.present();
  }

}
