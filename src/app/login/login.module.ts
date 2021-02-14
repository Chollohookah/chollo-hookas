import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginWrapperComponent } from './comps/login-wrapper/login-wrapper.component';
import { GeneralesModule } from '@tihomir22/generales-wrapper-lib';

@NgModule({
  declarations: [LoginWrapperComponent],
  imports: [CommonModule, LoginRoutingModule, GeneralesModule],
  exports: [LoginWrapperComponent],
})
export class LoginModule {}
