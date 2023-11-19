import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import * as de from '@angular/common/locales/de';

import { routes } from './app.routes';
registerLocaleData(de.default);
export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        {
            provide: LOCALE_ID,
            useValue: 'de-DE',
        },
    ],
};
