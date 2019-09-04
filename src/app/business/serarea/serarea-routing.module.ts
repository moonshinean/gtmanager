import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SerareaComponent} from './serarea/serarea.component';


const routes: Routes = [
{path: '', component: SerareaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SerareaRoutingModule { }
