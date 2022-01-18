import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import IRoom from '../interfaces/IRoom';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private subjectSocketChat = new BehaviorSubject(null);
  private observeChatSelected = this.subjectSocketChat.asObservable();

  private BASE_URL = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }


  set nextChatSelected(chat: any) {
    this.subjectSocketChat.next(chat);
  }

  get observeChat() {
    return this.observeChatSelected;
  }

  createRoom(room: IRoom): Observable<IRoom> {
    return this.http.post<IRoom>(`${this.BASE_URL}/room?page=1&limit=100`, room);
  }

  getRooms(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(`${this.BASE_URL}/room`);
  }


}
