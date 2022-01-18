import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { filter } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport)
  public viewport: CdkVirtualScrollViewport;

  public arr = new Array(5)

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.observeChatSelected();
  }

  observeChatSelected() {
    this.chatService.observeChat.pipe(filter(x => x !== null)).subscribe(resp => console.log(resp));
  }

  teste() {
    this.arr = [...this.arr, 1]
    requestAnimationFrame(() => {
      //this.viewport.scrollToIndex(this.arr.length + 1 , 'smooth');
      this.viewport.scrollTo({bottom: 0, behavior: 'smooth'})
    });
  }

}
