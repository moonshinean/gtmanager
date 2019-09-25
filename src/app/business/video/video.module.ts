import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { VideoComponent } from './video/video.component';
import { VideoGroupComponent } from './video-group/video-group.component';


@NgModule({
  declarations: [VideoComponent, VideoGroupComponent],
  imports: [
    CommonModule,
    VideoRoutingModule
  ]
})
export class VideoModule { }
