
import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { NavBarComponent } from './nav-bar/nav-bar.component';

// Modules
import { BrowserStorageService } from './browser-storage/browser-storage.service';
import { APP_CONFIG, AppConfig } from './services/config/app.config';
import { HeaderComponent } from './header/header.component';

//services
import { TokenStoreService } from './services/auth/token-store.service';
import { ApiConfigService } from './services/config/api-config.service';


// TODO: Shared Singleton services and Components
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ 
    // components that are used in app.component.ts will be listed here.
    NavBarComponent, 
    HeaderComponent],
  declarations: [
    // components that are used in app.component.ts will be listed here.
    NavBarComponent, 
    HeaderComponent],
  providers: [
    // singleton services of the whole app will be listed here.
    BrowserStorageService , 
    { 
      provide: APP_CONFIG, 
      useValue: AppConfig
    },
    TokenStoreService,
    ApiConfigService,
    { provide: APP_INITIALIZER,
      useFactory: (config: ApiConfigService) => () => config.loadApiConfig(),
      deps: [ApiConfigService],
      multi: true
    }
   ] 
})
export class CoreModule { 
  
  // Inject the Core to itself to make sure is singleton
  // @Optional() TODO: If this dependency hasn't been defined in "dependeny injection system",
  //  a Null will be injected instead of throwing the error.
  // @SkipSelf() TODO: Specifies that the dependency resolution should start from the parent injector.
  constructor( @Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error("CoreModule should be imported ONLY in AppModule.");
    }
  }

}
