import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BfTableComponent } from './bf-table/bf-table.component';
import { CheckTableBtnComponent } from './check-table-btn/check-table-btn.component';
import {TableModule} from 'primeng/table';
import { TreeTableComponent } from './tree-table/tree-table.component';
import {TreeTableModule} from 'primeng/primeng';



@NgModule({
  declarations: [BfTableComponent, CheckTableBtnComponent, TreeTableComponent],
  imports: [
    CommonModule,
    TableModule,
    TreeTableModule
  ],
  exports: [BfTableComponent, CheckTableBtnComponent, TreeTableComponent]
})
export class BasicTableModule { }
