import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {OwlCarouselComponent} from "./owl-carousel/owl-carousel.component";
import {IonicModule} from "@ionic/angular";


@NgModule({
  declarations: [
    OwlCarouselComponent
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    OwlCarouselComponent
  ]
})
export class ComponentsModule {
}
