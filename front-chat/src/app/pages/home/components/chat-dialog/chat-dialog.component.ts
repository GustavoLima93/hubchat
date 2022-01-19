import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { filter, mergeMap, tap } from 'rxjs';
import { UtilService } from 'src/app/shared/services/util.service';

import IRoom from '../../interfaces/IRoom';
import { IRoomDialog, OwnerId } from '../../interfaces/IRoomDialog';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport)
  public viewport: CdkVirtualScrollViewport;

  public messages: IRoomDialog[];

  public owner: OwnerId;

  public roomSelected: IRoom;

  public message: string;

  constructor(
    private chatService: ChatService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    const token = this.utilService.decodePayloadJWT;

    if (token) {
      this.owner = {
        _id: token.sub,
        name: token.name,
        email: token.email
      };
    }
    this.observeMessagesSocket();
    this.observeChatSelected();
  }

  observeChatSelected() {
    this.chatService.observeChat
      .pipe(
        filter((roomSelected: IRoom) => roomSelected.name !== ''),
        tap((roomSelected: IRoom) => this.connectRoom(roomSelected)),
        mergeMap((room) => this.chatService.getRoomDialog(room)))
      .subscribe((resp: IRoomDialog[]) => {
        this.messages = [...resp];
        this.finalViewPortScroll();
      });
  }

  observeMessagesSocket() {
    this.chatService.receivedMessages()
      .subscribe((message: IRoomDialog) => {
        this.messages = [...this.messages, message];
        this.finalViewPortScroll();
      });
  }

  connectRoom(room: IRoom) {
    if (this.roomSelected) {
      this.chatService.leaveRoom(this.roomSelected._id!);
    }
    this.roomSelected = room;
    this.chatService.enterRoom(room._id!);
  }

  sendMessage(message: HTMLInputElement) {
    const sendMessage = {
      message: message.value,
      roomId: this.roomSelected._id!,
      createdAt: new Date(),
      ownerId: this.owner,
      status: 'progress'
    }

    this.messages = [...this.messages, sendMessage];

    message.value = '';

    const indexMessage = this.messages.findIndex(msg => msg.status === 'progress' && msg.createdAt === sendMessage.createdAt);

    this.chatService.sendMessageRoom(sendMessage).subscribe(
      {
        next: () => {
          if (indexMessage !== -1) {
            this.messages[indexMessage].status = 'success';
          }
          this.chatService.sendMessages(sendMessage);
          this.finalViewPortScroll();
        },
        error: () => {
          if (indexMessage !== -1) {
            this.messages[indexMessage].status = 'error';
          }
          this.finalViewPortScroll();
        },
        complete: () => { }
      }
    );
  }

  finalViewPortScroll() {
    requestAnimationFrame(() => {
      this.viewport.scrollTo({ bottom: 0, behavior: 'smooth' })
    });
  }

}
