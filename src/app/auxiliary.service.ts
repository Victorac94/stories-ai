import { Injectable, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaryService {

  restart: Subject<boolean> = new Subject() as Subject<boolean>;
  shouldCreateImagePlaceholder: Subject<boolean> = new Subject() as Subject<boolean>;
  removeChooseOptionStyles: Subject<string> = new Subject() as Subject<string>;
  shouldFadeInHomeHeroText: boolean = true;

  private genreThumbnailData: any = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    imgSrc: '',
    genreData: {}
  };

  private storyThumbnailData: any = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    imgSrc: '',
    storyData: {}
  };

  genreThumbnailDataSubject: Subject<any> = new Subject();
  storyThumbnailDataSubject: Subject<any> = new Subject();
  #genreThumbnailRef: ElementRef = new ElementRef('');
  #storyThumbnailRef: ElementRef = new ElementRef('');
  #appContainerRef: ElementRef = new ElementRef(''); // '#' indicates it's a private variable
  #appHeaderRef: ElementRef = new ElementRef(''); // '#' indicates it's a private variable

  constructor() { }

  restartStory(isLoadingNewStory: boolean = false): void {
    if (isLoadingNewStory) {
      this.createImagePlaceholder();
    }
    this.restart.next(true);
  }

  doRemoveChooseOptionStyles(chooseOption: string): void {
    this.removeChooseOptionStyles.next(chooseOption);
  }

  createImagePlaceholder(): void {
    this.shouldCreateImagePlaceholder.next(true);
  }

  setGenreThumbnailRef(genreThumbnailRef: ElementRef): void {
    this.#genreThumbnailRef = genreThumbnailRef;
  }

  getGenreThumbnailRef(): ElementRef {
    return this.#genreThumbnailRef;
  }

  setStoryThumbnailRef(storyThumbnailRef: ElementRef): void {
    this.#storyThumbnailRef = storyThumbnailRef;
  }

  getStoryThumbnailRef(): ElementRef {
    return this.#storyThumbnailRef;
  }

  /**
   * Set given genre thumbnail info like position, size and image source
   * 
   * @param data object that MUST contain keys: top, left, width, height, imgSrc
   */
  setGenreThumbnailData(data: any): void {
    this.genreThumbnailData = { ...data };
    this.genreThumbnailDataSubject.next({ ...data });
  }

  /**
   * Get stored genre thumbnail data
   * 
   * @returns an object containing info like image position, size and img source
   */
  getGenreThumbnailData(): any {
    return this.genreThumbnailData;
  }

  /**
   * Set given story thumbnail info like position, size and image source
   * 
   * @param data object that MUST contain keys: top, left, width, height, imgSrc
   */
  setStoryThumbnailData(data: any): void {
    this.storyThumbnailData = { ...data };
    this.storyThumbnailDataSubject.next({ ...data });
  }

  /**
   * Get stored story thumbnail data
   * 
   * @returns an object containing info like image position, size and img source
   */
  getStoryThumbnailData(): any {
    return this.storyThumbnailData;
  }

  /**
   * Stores a reference to the #appCotainer element
   * 
   * @param appContainer A reference to the #appContainer element
   */
  setAppContainerRef(appContainer: ElementRef): void {
    this.#appContainerRef = appContainer;
  }

  /**
   * @returns A reference to the #appContainer element
   */
  getAppContainerRef(): ElementRef {
    return this.#appContainerRef;
  }

  /**
   * Stores a reference to the app's header element
   * 
   * @param appHeader A reference to the app's #header element
   */
  setAppHeaderRef(appHeader: ElementRef): void {
    this.#appHeaderRef = appHeader;
  }

  /**
   * @returns A reference to the app's #header element
   */
  getAppHeaderRef(): ElementRef {
    return this.#appHeaderRef;
  }
}
