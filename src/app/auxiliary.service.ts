import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaryService {

  restart: Subject<boolean> = new Subject() as Subject<boolean>;
  removeChooseOptionStyles: Subject<string> = new Subject() as Subject<string>;

  constructor() { }

  restartStory(): void {
    this.restart.next(true);
  }

  doRemoveChooseOptionStyles(chooseOption: string): void {
    this.removeChooseOptionStyles.next(chooseOption);
  }
}
