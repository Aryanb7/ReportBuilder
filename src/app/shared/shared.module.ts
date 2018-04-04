import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Components
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';


// Modules

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[// common and shared components/directives/pipes between more than one module and components will be listed here.
    CommonModule, 
    HttpClientModule,
    LoadingSpinnerComponent
  ],
  declarations: [LoadingSpinnerComponent], // common and shared components/directives/pipes between more than one module and components will be listed here.
  /* No providers here! Since they’ll be already provided in AppModule. */
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    // Forcing the whole app to use the returned providers from the AppModule only.
    return {
      ngModule: SharedModule,
      providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
    };
  }
 }
