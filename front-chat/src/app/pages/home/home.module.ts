import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HomeRoutingModule } from './home-routing.module';
import { ChatHomeComponent } from './components/chat-home/chat-home.component';
import { CoreModule } from 'src/app/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatRoomsComponent } from './components/chat-rooms/chat-rooms.component';
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';

@NgModule({
  declarations: [
    ChatHomeComponent,
    ChatRoomsComponent,
    ChatDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    ScrollingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class HomeModule { }
