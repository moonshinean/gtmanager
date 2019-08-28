import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import {AreaComponent} from './area/area.component';
import {SLoationModule} from '../../common/components/s-loation/s-loation.module';
import {ConfirmationService, ConfirmDialogModule, DialogModule, MessageModule, MessageService, MessagesModule} from 'primeng/primeng';
import {PagingModule} from '../../common/components/paging/paging.module';



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
  ],
  providers: [MessageService, ConfirmationService, DatePipe]
})
export class AreaModule { }
