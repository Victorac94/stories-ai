import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaryService {

  restart: Subject<boolean> = new Subject() as Subject<boolean>;
  // isLoadingNewStory: Subject<boolean> = new Subject() as Subject<boolean>;
  shouldCreateImagePlaceholder: Subject<boolean> = new Subject() as Subject<boolean>;
  removeChooseOptionStyles: Subject<string> = new Subject() as Subject<string>;
  shouldFadeInHomeHeroText: boolean = true;

  constructor() { }

  restartStory(isLoadingNewStory: boolean = false): void {
    if (isLoadingNewStory) {
      // this.isLoadingNewStory.next(isLoadingNewStory);
      this.shouldCreateImagePlaceholder.next(true);
    }
    this.restart.next(true);
  }

  doRemoveChooseOptionStyles(chooseOption: string): void {
    this.removeChooseOptionStyles.next(chooseOption);
  }

  createImagePlaceholder(): void {
    this.shouldCreateImagePlaceholder.next(true);
  }
}
