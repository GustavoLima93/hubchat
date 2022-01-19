import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

import IRoom from '../interfaces/IRoom';
import { IRoomDialog } from '../interfaces/IRoomDialog';

import { io, Socket } from "socket.io-client";
import { UtilService } from 'src/app/shared/services/util.service';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private initialRoom = {
    name: '',
    createdAt: new Date(),
  }

  private subjectSocketChat = new BehaviorSubject<IRoom>(this.initialRoom);
  private observeChatSelected = this.subjectSocketChat.asObservable();

  private BASE_URL = environment.baseUrl;
  private WS_URL= environment.ws;

  private socket: Socket;

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) {
    const token = this.utilService.getLocalStorage('token');

    this.socket = io(this.WS_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /** Metodos reativos utilitarios */


  set nextChatSelected(chat: any) {
    this.subjectSocketChat.next(chat);
  }

  get observeChat() {
    return this.observeChatSelected;
  }

  /** Metodos api */

  createRoom(room: IRoom): Observable<IRoom> {
    return this.http.post<IRoom>(`${this.BASE_URL}/room`, room).pipe(take(1));
  }

  getRooms(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(`${this.BASE_URL}/room?page=1&limit=100`).pipe(take(1));
  }

  getRoomDialog({ _id }: any): Observable<IRoomDialog[]>{
    return this.http.get<IRoomDialog[]>(`${this.BASE_URL}/room-dialog?roomId=${_id}&page=1&limit=50`).pipe(take(1));
  }

  sendMessageRoom({ message, roomId }: IRoomDialog): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}/room-dialog`, { message, roomId }).pipe(take(1));
  }

  /** Metodos Socket */

  enterRoom(room: string): void {
    this.socket.emit('EnterRoom', room);
  }

  leaveRoom(room: string): void {
    this.socket.emit('LeaveRoom', room);
  }

  newRoom(room: IRoom): void {
    this.socket.emit('CreatedRoom', room);
  }

  sendMessages(message: IRoomDialog): void {
    this.socket.emit('SendMessagesRoom', message);
  }

  receivedMessages(): Observable<IRoomDialog> {
    return new Observable(observer => {
      this.socket.on('ReceivedMessagesRoom', (data: IRoomDialog) => {
        observer.next(data);
      });
    });
  }

  receivedCreatedRoom(): Observable<IRoom> {
    return new Observable(observer => {
      this.socket.on('CreatedRoom', (data: IRoom) => {
        observer.next(data);
      });
    });
  }

  receivedNotificationRoom(): Observable<IRoomDialog> {
    return new Observable(observer => {
      this.socket.on('NotificationMessageRoom', (data: IRoomDialog) => {
        observer.next(data);
      });
    });
  }

}
