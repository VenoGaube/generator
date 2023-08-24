export const COMPONENT_BASE = [
    {
        'tag': 'app-base',
        'value': 'Generating base',
        'html':
`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title><$page-title$></title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
`,
        'ts':
`import {enableProdMode} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
`
    }
];