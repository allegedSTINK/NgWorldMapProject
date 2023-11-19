import { Component } from '@angular/core';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})

export class TopBarComponent {
  constructor(public data: SharedDataService) {}
}
