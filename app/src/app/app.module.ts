import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {JwtInterceptor} from './shared/interceptor/jwt.interceptor';
import {ComponentsModule} from "./components/components.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
