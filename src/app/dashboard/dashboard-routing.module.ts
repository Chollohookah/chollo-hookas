import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardWrapperComponent } from './comps/dashboard-wrapper/dashboard-wrapper.component';
import { MainComponent } from './comps/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardWrapperComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'blog',
        loadChildren: () => import('../blog/blog.module').then((m) => m.BlogModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
