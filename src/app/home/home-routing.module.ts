import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'main' , loadChildren: () => import('../business/main/main.module').then(m => m.MainModule)},
      {path: 'area', loadChildren: () => import('../business/area/area.module').then(m => m.AreaModule)},
      {path: 'serarea', loadChildren: () => import('../business/serarea/serarea.module').then(m => m.SerareaModule)},
      {path: 'intercept', loadChildren: () => import('../business/intercept/intercept.module').then(m => m.InterceptModule)},
      {path: 'store', loadChildren: () => import('../business/store/store.module').then(m => m.StoreModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
