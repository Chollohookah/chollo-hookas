import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginWrapperComponent } from './comps/login-wrapper/login-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: LoginWrapperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
