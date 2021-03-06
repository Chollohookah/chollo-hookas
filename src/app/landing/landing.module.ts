import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { BaseLandingComponent } from './components/base-landing/base-landing.component';
import {GeneralesModule} from '@chollohookah/generales-wrapper-lib';


@NgModule({
  declarations: [BaseLandingComponent],
  imports: [
    CommonModule,
    GeneralesModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
