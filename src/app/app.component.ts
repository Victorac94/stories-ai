import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { AuxiliaryService } from './auxiliary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('appContainer') appContainer: ElementRef = new ElementRef('');
  @ViewChild('header') header: ElementRef = new ElementRef('');

  constructor(
    private auxiliaryService: AuxiliaryService,
  ) {

  }

  ngAfterViewInit(): void {
    this.auxiliaryService.setAppContainerRef(this.appContainer);
    this.auxiliaryService.setAppHeaderRef(this.header);
  }
}
