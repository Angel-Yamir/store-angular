import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
//preloading es para la tecnica de prefetching
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules)), //with componentINputValue es una funcion que se ejecuta para que los parametros de las rutas puedan ser resividos como inputs
    provideClientHydration(),
    provideHttpClient()]
};
