import { Component, ViewEncapsulation } from '@angular/core';
import { SharedDataService } from '../shared-data.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SideBarComponent {
  constructor(public data: SharedDataService) {}

  posX = 0;
  posY = 0;
  offsetX = 0;
  offsetY = 0;
  isDragging = false;

  onDragStart(event: MouseEvent): void {
    this.isDragging = true;
    this.offsetX = event.clientX - this.posX;
    this.offsetY = event.clientY - this.posY;
  }

  onDragging(event: MouseEvent): void {
    if (this.isDragging) {
      this.posX = event.clientX - this.offsetX;
      this.posY = event.clientY - this.offsetY;
    }
  }

  onDragEnd(): void {
    this.isDragging = false;
  }
}
