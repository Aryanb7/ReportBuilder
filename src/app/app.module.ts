
// Angular 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { componentFactoryName } from '@angular/compiler';


// Componenets
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

// Modules
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
    
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule.forRoot(),
    AuthenticationModule,
    
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
