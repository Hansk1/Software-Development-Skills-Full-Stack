import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ValidateService } from './services/validate.service';
import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ValidateService,
    AuthService,
    provideHttpClient(),
    HttpClient,
    AuthGuard,
  ],
};
