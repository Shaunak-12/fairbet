import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment.prod';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

(window as any).PF = {
  config: {
      mode: 'bs4'
  }
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
