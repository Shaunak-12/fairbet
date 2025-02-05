// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { FeatherModule } from 'angular-feather';

import { allIcons } from 'angular-feather/icons';
import { uiReducer } from '@/store/ui/reducer';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { provideStore } from '@ngrx/store';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient(withFetch()),
     importProvidersFrom(FeatherModule.pick(allIcons)),
     provideStore(),
  
     provideAnimations(),
     provideStore({ ui: uiReducer }),
     provideToastr(),
     { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } } // Disable ripples globally
 
    ]
};
