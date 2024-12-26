import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideRouter } from "@angular/router";
import { appConfig } from './app.config';
import { provideHttpClient } from "@angular/common/http";//esto es para que funcione la api de productos

import { routes } from "./app.routes";
const serverConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideServerRendering(),
    provideHttpClient()    
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
