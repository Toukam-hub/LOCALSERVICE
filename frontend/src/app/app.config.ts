import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER} from 'ngx-ui-loader';
import {provideHttpClient} from '@angular/common/http';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';

const ngxUiLoaderConfiguration: NgxUiLoaderConfig = {
  text: "Loading... ",
  textColor: "#ffffff",
  textPosition: "center-center",
  bgsColor: "rgba(64, 168, 164, 0.9)",
  fgsColor: "rgba(64, 168, 164, 0.9)",
  fgsType: SPINNER.ballSpin,
  fgsSize: 100,
  hasProgressBar: false,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(NgxUiLoaderModule.forRoot(ngxUiLoaderConfiguration)),
    provideHttpClient(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ]
};
