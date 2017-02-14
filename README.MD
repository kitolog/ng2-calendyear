# ng2-calendyear

## Installation

To install this library, run:

```bash
$ npm install ng2-calendyear --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ng2-calendyear
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { SampleModule } from 'ng2-calendyear';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

import styles in your scss file
```xml
@import '~ng2-calendyear/resources/calendyear';
```
Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<sampleComponent></sampleComponent>
```

## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [kitolog](mailto:nikita.kosilo@gmail.com)
