import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import IRoom from '../../interfaces/IRoom';
import { IRoomDialog } from '../../interfaces/IRoomDialog';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss'],

})
export class ChatRoomsComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport)
  public viewport: CdkVirtualScrollViewport;

  public modalRef?: BsModalRef;

  public arr = new Array(5);

  public rooms: IRoom[];

  public formRoom: FormGroup;

  public spinnerButton = false;

  public selectRoom: IRoom;

  get name() {
    return this.formRoom.controls['name'];
  }

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private chatService: ChatService,
    private _toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.initFormRoom();
    this.observeNewRoomSocket();
    this.observeNotificationMessageRoom();
    this.getRooms();
  }

  initFormRoom() {
    this.formRoom = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  observeNewRoomSocket() {
    this.chatService.receivedCreatedRoom()
      .subscribe((room: IRoom) => {
        this.rooms = [...this.rooms, room]
        requestAnimationFrame(() => {
          this.viewport.scrollTo({ bottom: 0, behavior: 'smooth' })
        });
      });
  }

  observeNotificationMessageRoom() {
    this.chatService.receivedNotificationRoom()
      .subscribe((message: IRoomDialog) => {
        const index = this.rooms.findIndex(room => room._id === message.roomId);

        if((this.selectRoom && this.selectRoom._id ===  message.roomId) || index === -1){
          return;
        }

        if(this.rooms[index]?.notification) {
          this.rooms[index].notification! += 1;
        } else {
          this.rooms[index].notification = 1;
        }

      });
  }

  getRooms() {
    this.chatService.getRooms().subscribe(
      {
        next: (resp: IRoom[]) => {
          this.rooms = [...resp];
          this.chatService.nextChatSelected = this.rooms.length ? { ...this.rooms[0], index: 0 } : { name: ''};
        },
        error: () => { },
        complete: () => { }
      }
    );
  }

  openModalCreateGroup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  createRoom() {
    this.spinnerButton = true;
    this.chatService.createRoom(this.formRoom.value).subscribe(
      {
        next: (resp: IRoom) => {
          this.rooms = [...this.rooms, resp];
          this.spinnerButton = false;
          this._toastService.success('Sala criada');
          this.modalRef?.hide();
          this.formRoom.reset();
          this.chatService.newRoom(resp);
          requestAnimationFrame(() => {
            this.viewport.scrollTo({ bottom: 0, behavior: 'smooth' })
          });

        },
        error: () => {
          this._toastService.error('Ocorreu um erro ao criar sala');
          this.spinnerButton = false;
        },
        complete: () => { }
      }
    );
  }

  selectChat(item: IRoom, index: number) {
    this.selectRoom = { ...item, index };
    this.rooms[index].notification = 0;
    this.chatService.nextChatSelected = { ...item, index };
  }


}
