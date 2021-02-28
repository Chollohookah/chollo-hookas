import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardWrapperComponent } from './comps/dashboard-wrapper/dashboard-wrapper.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { MainComponent } from './comps/main/main.component';

@NgModule({
  declarations: [DashboardWrapperComponent, MainComponent],
  imports: [CommonModule, RouterModule, DashboardRoutingModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class DashboardModule { }
