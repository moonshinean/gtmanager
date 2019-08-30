import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import {AreaComponent} from './area/area.component';
import {SLoationModule} from '../../common/components/s-loation/s-loation.module';
import {ConfirmationService, ConfirmDialogModule, DialogModule, MessageModule, MessageService, MessagesModule} from 'primeng/primeng';
import {PagingModule} from '../../common/components/paging/paging.module';
import {BasicTableModule} from '../../common/components/basic-table/basic-table.module';
import {PublicMethedService} from '../../common/tool/public-methed.service';



@NgModule({
  declarations: [AreaComponent],
  imports: [
    CommonModule,
    AreaRoutingModule,
    SLoationModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    PagingModule,
    DialogModule,
    BasicTableModule,
  ],
  providers: [MessageService, ConfirmationService, DatePipe, PublicMethedService]
})
export class AreaModule { }
