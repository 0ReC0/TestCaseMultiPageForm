import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from './app.component';

import {CalendarModule} from 'primeng/calendar';
import {AngularYandexMapsModule, YaConfig} from 'angular8-yandex-maps';
import {environment} from "../environments/environment";
import { ModalComponent } from './modal/modal.component';

const mapConfig: YaConfig = {
  apikey: environment.yandexMapsJSApiKey,
  lang: 'ru_RU',
};

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CalendarModule,
    AngularYandexMapsModule.forRoot(mapConfig)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
