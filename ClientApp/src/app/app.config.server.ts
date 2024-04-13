import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { appConfig } from './app.config';

import * as translationEn from './../assets/i18n/en.json';
import * as translationVi from './../assets/i18n/vi.json';

class TranslateJsonLoader implements TranslateLoader {
  public getTranslation(lang: string) {
    switch (lang) {
      case 'vi': return of(translationVi);
      default: return of(translationEn);
    }
  }
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: () => {
            return new TranslateJsonLoader();
          }
        }
      })
    )
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
