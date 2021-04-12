import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GeneralesModule } from '@chollohookah/generales-wrapper-lib';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { BrowserModule } from '@angular/platform-browser';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    GeneralesModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgxGoogleAnalyticsModule.forRoot('G-6X0ZHVKZW3'),
    NgxGoogleAnalyticsRouterModule,
    /*Mugan86GoogleAnalyticsModule.forRoot({
      analyticsId: 'G-6X0ZHVKZW3',
      showLog: false,
    }),*/
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    HttpClientModule,
    MatFormFieldModule,
    ToastrModule.forRoot(),
    QuillModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
