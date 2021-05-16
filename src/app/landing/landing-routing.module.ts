import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLandingComponent } from './components/base-landing/base-landing.component';

const routes: Routes = [
 
  {
    path: '',
    component: BaseLandingComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
