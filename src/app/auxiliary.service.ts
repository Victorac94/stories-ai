import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaryService {

  restart: Subject<boolean> = new Subject() as Subject<boolean>;

  constructor() { }

  restartStory(): void {
    this.restart.next(true);
  }
}
