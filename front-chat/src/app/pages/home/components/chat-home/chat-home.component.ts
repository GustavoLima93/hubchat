import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.scss']
})
export class ChatHomeComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport)
  public viewport: CdkVirtualScrollViewport;

  public arr = new Array(5)



  constructor() {}

  ngOnInit(): void {

  }

  teste() {
    this.arr = [...this.arr, 1]
    requestAnimationFrame(() => {
      //this.viewport.scrollToIndex(this.arr.length + 1 , 'smooth');
      this.viewport.scrollTo({bottom: 0, behavior: 'smooth'})
    });
  }

}
