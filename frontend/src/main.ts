import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideAnimations  } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(App, {
  providers: [
    ...appConfig.providers,
    provideAnimations(),
    provideToastr({
      timeOut: 1000,
      extendedTimeOut: 1000,
      closeButton: true,
      enableHtml: true,
      tapToDismiss: false,
      positionClass: 'toast-top-center',
    }),
  ],
}).catch((err) => console.error(err));